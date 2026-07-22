import { useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, Loader2, Paperclip } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RENTAL_EQUIPMENT_OPTIONS } from "@/data/rental-equipment";
import { supabase } from "@/integrations/supabase/client";
import { attachmentPath, canSubmit, getPageContext, getStoredUtms } from "@/lib/lead-tracking";

const MAX_FILE_MB = 10;
const ACCEPTED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);
const ACCEPTED_EXT = /\.(pdf|doc|docx|png|jpg|jpeg|webp)$/i;

const rentalSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("E-mail inválido.").max(255),
  phone: z
    .string()
    .trim()
    .min(8, "Telefone inválido.")
    .max(25)
    .regex(/^[\d\s()+-]+$/, "Use apenas números e ( ) + -."),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  eventLocation: z.string().trim().max(200).optional().or(z.literal("")),
  startDate: z.string().trim().max(20).optional().or(z.literal("")),
  endDate: z.string().trim().max(20).optional().or(z.literal("")),
  projectType: z.string().trim().max(160).optional().or(z.literal("")),
  equipment: z.array(z.string()).optional(),
  quantity: z.string().trim().max(80).optional().or(z.literal("")),
  needsDelivery: z.boolean().optional(),
  needsInstall: z.boolean().optional(),
  needsSupport: z.boolean().optional(),
  description: z
    .string()
    .trim()
    .max(2000, "Máximo de 2000 caracteres.")
    .optional()
    .or(z.literal("")),
  equipmentDetails: z
    .string()
    .trim()
    .max(1000, "Máximo de 1000 caracteres.")
    .optional()
    .or(z.literal("")),
});

type RentalFormValues = z.infer<typeof rentalSchema>;

interface RentalRequestDialogProps {
  children: ReactNode;
  defaultEquipment?: string;
  sourcePage?: string;
  sourceCta?: string;
  onOpenChange?: (open: boolean) => void;
}

export function RentalRequestDialog({
  children,
  defaultEquipment,
  sourcePage,
  sourceCta,
  onOpenChange,
}: RentalRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const triggerRef = useRef<HTMLSpanElement | null>(null);

  const updateOpen = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RentalFormValues>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      city: "",
      eventLocation: "",
      startDate: "",
      endDate: "",
      projectType: "",
      equipment: defaultEquipment ? [defaultEquipment] : [],
      quantity: "",
      needsDelivery: false,
      needsInstall: false,
      needsSupport: false,
      description: "",
      equipmentDetails: "",
    },
  });

  const equipment = watch("equipment") ?? [];

  const toggleEquipment = (value: string, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...(equipment ?? []), value]))
      : (equipment ?? []).filter((v) => v !== value);
    setValue("equipment", next, { shouldDirty: true });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      setFileName(null);
      return;
    }
    const validType = ACCEPTED_MIME.has(f.type) || ACCEPTED_EXT.test(f.name);
    if (!validType) {
      toast.error("Formato inválido", {
        description: "Envie PDF, DOC, DOCX, PNG, JPG, JPEG ou WEBP.",
      });
      e.target.value = "";
      setFile(null);
      setFileName(null);
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error("Arquivo grande demais", {
        description: `Anexe um documento de até ${MAX_FILE_MB} MB.`,
      });
      e.target.value = "";
      setFile(null);
      setFileName(null);
      return;
    }
    setFile(f);
    setFileName(f.name);
  };

  const onSubmit = async (data: RentalFormValues, event?: React.BaseSyntheticEvent) => {
    const form = event?.target as HTMLFormElement | undefined;
    const honeypot = form?.querySelector<HTMLInputElement>('input[name="company_website"]');
    if (honeypot?.value) return;

    if (!canSubmit("locacao")) {
      toast.error("Aguarde alguns instantes antes de reenviar.");
      return;
    }

    const ctx = getPageContext();
    const utms = getStoredUtms();
    const triggerText = triggerRef.current?.innerText?.trim().slice(0, 120) ?? "";
    const leadId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    let attachment_url: string | null = null;
    let uploadedPath: string | null = null;
    if (file) {
      const path = attachmentPath(leadId, file.name);
      const { error: uploadError } = await supabase.storage
        .from("fohat-lead-attachments")
        .upload(path, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });
      if (uploadError) {
        if (import.meta.env.DEV) console.error("[fohat_leads:upload]", uploadError);
        toast.error("Não foi possível enviar o anexo.", {
          description: "Seus dados foram mantidos. Tente novamente em instantes.",
        });
        return;
      }
      attachment_url = path;
      uploadedPath = path;
    }

    const { error } = await supabase.from("fohat_leads").insert({
      id: leadId,
      lead_type: "locacao",
      name: data.name,
      company: data.company || null,
      email: data.email,
      phone: data.phone,
      city: data.city || null,
      event_location: data.eventLocation || null,
      start_date: data.startDate || null,
      end_date: data.endDate || null,
      project_type: data.projectType || null,
      equipment: data.equipment && data.equipment.length ? data.equipment : null,
      quantity: data.quantity || null,
      needs_delivery: !!data.needsDelivery,
      needs_install: !!data.needsInstall,
      needs_support: !!data.needsSupport,
      description: data.description || null,
      equipment_details: data.equipmentDetails || null,
      attachment_url,
      source_page: sourcePage ?? ctx.source_page,
      source_cta: sourceCta ?? triggerText,
      page_url: ctx.page_url,
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      utm_content: utms.utm_content,
      utm_term: utms.utm_term,
      status: "novo",
    });

    if (error) {
      if (import.meta.env.DEV) console.error("[fohat_leads:locacao]", error);
      if (uploadedPath) {
        const { error: removeError } = await supabase.storage
          .from("fohat-lead-attachments")
          .remove([uploadedPath]);
        if (removeError && import.meta.env.DEV) {
          console.error("[fohat_leads:cleanup]", removeError);
        }
      }
      toast.error("Não foi possível enviar agora.", {
        description: "Seus dados foram mantidos. Tente novamente em instantes.",
      });
      return;
    }

    toast.success("Recebemos sua solicitação.", {
      description: "Nossa equipe verificará disponibilidade, configuração e logística.",
    });
    reset();
    setFile(null);
    setFileName(null);
    updateOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={updateOpen}>
      <DialogTrigger asChild>
        <span ref={triggerRef} className="contents">
          {children}
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-line bg-card p-6 sm:max-w-2xl sm:p-10">
        <DialogHeader className="space-y-3 text-left">
          <span className="fohat-eyebrow">Locação de equipamentos</span>
          <DialogTitle className="fohat-h2 text-3xl sm:text-4xl">
            Solicite disponibilidade
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Conte quais equipamentos você precisa e como será o projeto. A equipe da FOHAT avaliará
            disponibilidade, configuração, logística e suporte necessário.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6" noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {/* Contato */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome" htmlFor="rent-name" error={errors.name?.message}>
              <Input
                id="rent-name"
                autoComplete="name"
                maxLength={100}
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("name")}
              />
            </Field>
            <Field label="Empresa" htmlFor="rent-company">
              <Input
                id="rent-company"
                autoComplete="organization"
                maxLength={120}
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("company")}
              />
            </Field>
            <Field label="E-mail" htmlFor="rent-email" error={errors.email?.message}>
              <Input
                id="rent-email"
                type="email"
                autoComplete="email"
                maxLength={255}
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("email")}
              />
            </Field>
            <Field label="Telefone" htmlFor="rent-phone" error={errors.phone?.message}>
              <Input
                id="rent-phone"
                autoComplete="tel"
                inputMode="tel"
                maxLength={25}
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("phone")}
              />
            </Field>
          </div>

          {/* Evento */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cidade" htmlFor="rent-city">
              <Input
                id="rent-city"
                maxLength={120}
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("city")}
              />
            </Field>
            <Field label="Local do evento" htmlFor="rent-location">
              <Input
                id="rent-location"
                maxLength={200}
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("eventLocation")}
              />
            </Field>
            <Field label="Data de início" htmlFor="rent-start">
              <Input
                id="rent-start"
                type="date"
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("startDate")}
              />
            </Field>
            <Field label="Data de encerramento" htmlFor="rent-end">
              <Input
                id="rent-end"
                type="date"
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("endDate")}
              />
            </Field>
            <Field label="Tipo de evento ou projeto" htmlFor="rent-type" className="sm:col-span-2">
              <Input
                id="rent-type"
                placeholder="Ex.: ativação de marca, feira, exposição, festival…"
                maxLength={160}
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("projectType")}
              />
            </Field>
          </div>

          {/* Equipamentos */}
          <div className="space-y-3">
            <div className="fohat-mono text-[11px] uppercase tracking-[0.16em] text-blue">
              Equipamentos desejados
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {RENTAL_EQUIPMENT_OPTIONS.map((opt) => {
                const id = `eq-${opt}`;
                const checked = equipment?.includes(opt);
                return (
                  <label
                    key={opt}
                    htmlFor={id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-navy transition-colors hover:border-blue/40"
                  >
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={(c) => toggleEquipment(opt, Boolean(c))}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>

          <Field label="Quantidade estimada" htmlFor="rent-qty">
            <Input
              id="rent-qty"
              placeholder="Ex.: 2 impressoras, 4 tablets…"
              maxLength={80}
              className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
              {...register("quantity")}
            />
          </Field>

          {/* Necessidades */}
          <div className="space-y-3">
            <div className="fohat-mono text-[11px] uppercase tracking-[0.16em] text-blue">
              Necessidades adicionais
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <BoolBox id="rent-delivery" label="Entrega" {...register("needsDelivery")} />
              <BoolBox id="rent-install" label="Instalação" {...register("needsInstall")} />
              <BoolBox id="rent-support" label="Suporte técnico" {...register("needsSupport")} />
            </div>
          </div>

          <Field
            label="Descrição da operação"
            htmlFor="rent-description"
            error={errors.description?.message}
          >
            <Textarea
              id="rent-description"
              rows={4}
              maxLength={2000}
              placeholder="Conte como será o projeto: fluxo, público, dias, ambiente…"
              className="rounded-xl border-line bg-background focus-visible:ring-blue"
              {...register("description")}
            />
          </Field>

          <Field
            label="Descreva os equipamentos ou a estrutura que você precisa"
            htmlFor="rent-details"
            error={errors.equipmentDetails?.message}
          >
            <Textarea
              id="rent-details"
              rows={3}
              maxLength={1000}
              placeholder="Se preferir descrever em texto livre."
              className="rounded-xl border-line bg-background focus-visible:ring-blue"
              {...register("equipmentDetails")}
            />
          </Field>

          {/* Anexo */}
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-[0.14em] text-blue">
              Anexar briefing ou documento (opcional)
            </Label>
            <label
              htmlFor="rent-file"
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-line bg-background px-4 py-3 text-sm text-navy transition-colors hover:border-blue/40"
            >
              <span className="flex items-center gap-3">
                <Paperclip className="h-4 w-4 text-blue" />
                {fileName ?? "Selecionar arquivo (até 10 MB)"}
              </span>
              <span className="fohat-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                PDF · DOC · Imagem
              </span>
            </label>
            <input
              id="rent-file"
              type="file"
              className="sr-only"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
              onChange={onFileChange}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-navy px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-blue disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Registrando solicitação…
              </>
            ) : (
              <>
                Consultar disponibilidade
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>

          <p className="rounded-2xl border border-line bg-mist px-5 py-4 text-xs text-muted-foreground">
            O envio da solicitação não confirma reserva. A disponibilidade, os valores, a logística
            e o escopo técnico serão confirmados pela equipe da FOHAT.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- helpers ---------- */

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={htmlFor} className="text-xs uppercase tracking-[0.14em] text-blue">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

const BoolBox = ({
  id,
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label
    htmlFor={id}
    className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-navy transition-colors hover:border-blue/40 has-[:checked]:border-blue has-[:checked]:bg-blue/5"
  >
    <input
      id={id}
      type="checkbox"
      className="h-4 w-4 rounded border-line accent-[color:var(--color-navy)]"
      {...rest}
    />
    {label}
  </label>
);
