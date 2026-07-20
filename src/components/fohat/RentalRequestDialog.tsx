import { useState, type ReactNode } from "react";
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

const MAX_FILE_MB = 10;

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
  /** Pré-seleciona uma categoria (ex.: quando aberto a partir de um card de categoria). */
  defaultEquipment?: string;
}

export function RentalRequestDialog({
  children,
  defaultEquipment,
}: RentalRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

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
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error("Arquivo grande demais", {
        description: `Anexe um documento de até ${MAX_FILE_MB} MB.`,
      });
      e.target.value = "";
      setFileName(null);
      return;
    }
    setFileName(file.name);
  };

  const onSubmit = async (data: RentalFormValues) => {
    // Integração com backend / WhatsApp será conectada posteriormente.
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Solicitação recebida", {
      description: `Retornaremos em breve, ${data.name.split(" ")[0]}.`,
    });
    reset();
    setFileName(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-line bg-card p-6 sm:max-w-2xl sm:p-10">
        <DialogHeader className="space-y-3 text-left">
          <span className="fohat-eyebrow">Locação de equipamentos</span>
          <DialogTitle className="fohat-h2 text-3xl sm:text-4xl">
            Solicite disponibilidade
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Conte quais equipamentos você precisa e como será o projeto. A
            equipe da FOHAT avaliará disponibilidade, configuração, logística e
            suporte necessário.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-6"
          noValidate
        >
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
            <Field
              label="E-mail"
              htmlFor="rent-email"
              error={errors.email?.message}
            >
              <Input
                id="rent-email"
                type="email"
                autoComplete="email"
                maxLength={255}
                className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
                {...register("email")}
              />
            </Field>
            <Field
              label="Telefone"
              htmlFor="rent-phone"
              error={errors.phone?.message}
            >
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
            <Field
              label="Tipo de evento ou projeto"
              htmlFor="rent-type"
              className="sm:col-span-2"
            >
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
              <BoolBox
                id="rent-delivery"
                label="Entrega"
                {...register("needsDelivery")}
              />
              <BoolBox
                id="rent-install"
                label="Instalação"
                {...register("needsInstall")}
              />
              <BoolBox
                id="rent-support"
                label="Suporte técnico"
                {...register("needsSupport")}
              />
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
                <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
              </>
            ) : (
              <>
                Consultar disponibilidade
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>

          <p className="rounded-2xl border border-line bg-mist px-5 py-4 text-xs text-muted-foreground">
            O envio da solicitação não confirma reserva. A disponibilidade, os
            valores, a logística e o escopo técnico serão confirmados pela
            equipe da FOHAT.
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
      <Label
        htmlFor={htmlFor}
        className="text-xs uppercase tracking-[0.14em] text-blue"
      >
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
