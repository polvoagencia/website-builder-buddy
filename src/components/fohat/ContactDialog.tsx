import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, Loader2 } from "lucide-react";
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

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome completo." })
    .max(100, { message: "Nome muito longo." }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido." })
    .max(255, { message: "E-mail muito longo." }),
  whatsapp: z
    .string()
    .trim()
    .min(10, { message: "WhatsApp inválido." })
    .max(20, { message: "WhatsApp inválido." })
    .regex(/^[\d\s()+-]+$/, { message: "Use apenas números e ( ) + -." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactDialogProps {
  children: ReactNode;
}

export function ContactDialog({ children }: ContactDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", whatsapp: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simula envio; integração com WhatsApp / backend será conectada depois.
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Recebemos sua mensagem", {
      description: `Em breve entraremos em contato, ${data.name.split(" ")[0]}.`,
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-3xl border-line bg-card p-8 sm:p-10">
        <DialogHeader className="space-y-3 text-left">
          <span className="fohat-eyebrow">Conte sua ideia</span>
          <DialogTitle className="fohat-h2 text-3xl sm:text-4xl">
            Vamos projetar uma presença.
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Deixe seu contato. Retornamos em até um dia útil para entender o que
            você quer que o público viva, sinta ou lembre.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="fohat-name" className="text-xs uppercase tracking-[0.14em] text-blue">
              Nome
            </Label>
            <Input
              id="fohat-name"
              placeholder="Como podemos te chamar?"
              autoComplete="name"
              maxLength={100}
              aria-invalid={!!errors.name}
              className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fohat-whatsapp" className="text-xs uppercase tracking-[0.14em] text-blue">
              WhatsApp
            </Label>
            <Input
              id="fohat-whatsapp"
              placeholder="(11) 99999-9999"
              autoComplete="tel"
              inputMode="tel"
              maxLength={20}
              aria-invalid={!!errors.whatsapp}
              className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
              {...register("whatsapp")}
            />
            {errors.whatsapp && (
              <p className="text-xs text-destructive">{errors.whatsapp.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fohat-email" className="text-xs uppercase tracking-[0.14em] text-blue">
              E-mail
            </Label>
            <Input
              id="fohat-email"
              type="email"
              placeholder="voce@empresa.com"
              autoComplete="email"
              maxLength={255}
              aria-invalid={!!errors.email}
              className="h-12 rounded-xl border-line bg-background focus-visible:ring-blue"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
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
                Enviar contato
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Ao enviar, você concorda em ser contatado pela FOHAT sobre sua ideia.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
