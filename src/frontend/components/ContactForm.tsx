import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { SiteContent } from '../content/types';

interface ContactFormProps {
  formContent: SiteContent['chapter04']['form'];
}

type FormStatus = 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'VALIDATION_ERROR' | 'SERVER_ERROR';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const WORKER_ENDPOINT = 'https://postlain-api.postlain-music.workers.dev';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm: React.FC<ContactFormProps> = ({ formContent }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('IDLE');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string>('');

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errors.name = 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự).';
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = 'Vui lòng nhập định dạng email hợp lệ (ví dụ: name@domain.com).';
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      errors.message = 'Vui lòng nhập nội dung trao đổi (tối thiểu 10 ký tự).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setStatus('VALIDATION_ERROR');
      return;
    }

    setStatus('SUBMITTING');
    setServerMessage('');

    try {
      const res = await fetch(`${WORKER_ENDPOINT}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus('SUCCESS');
        setServerMessage(formContent.successMessage);
        setFormData({ name: '', email: '', message: '' });
        setFieldErrors({});
      } else {
        setStatus('SERVER_ERROR');
        setServerMessage(data?.message || formContent.errorMessage);
      }
    } catch {
      setStatus('SERVER_ERROR');
      setServerMessage(formContent.errorMessage);
    }
  };

  const handleReset = () => {
    setStatus('IDLE');
    setServerMessage('');
    setFieldErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Contact dispatch form">
      
      {/* Name Input */}
      <div>
        <label htmlFor="contact-name" className="block text-xs font-mono text-ink-muted uppercase mb-1.5 font-medium">
          {formContent.namePlaceholder} <span className="text-accent-amber" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          disabled={status === 'SUBMITTING'}
          value={formData.name}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
          }}
          placeholder="Ngô Phúc (POSTLAIN)"
          className={`w-full px-4 py-3 rounded-md bg-bg-surface border text-ink-hero placeholder-ink-muted/60 text-sm focus:bg-bg-elevated transition-colors duration-150 outline-none ${
            fieldErrors.name
              ? 'border-red-500/80 focus:border-red-400'
              : 'border-edge-subtle focus:border-edge-accent'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className="mt-1 text-xs font-mono text-red-400" role="alert">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="contact-email" className="block text-xs font-mono text-ink-muted uppercase mb-1.5 font-medium">
          {formContent.emailPlaceholder} <span className="text-accent-amber" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          disabled={status === 'SUBMITTING'}
          value={formData.email}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
          }}
          placeholder="recruiter@company.com"
          className={`w-full px-4 py-3 rounded-md bg-bg-surface border text-ink-hero placeholder-ink-muted/60 text-sm focus:bg-bg-elevated transition-colors duration-150 outline-none ${
            fieldErrors.email
              ? 'border-red-500/80 focus:border-red-400'
              : 'border-edge-subtle focus:border-edge-accent'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" className="mt-1 text-xs font-mono text-red-400" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-mono text-ink-muted uppercase mb-1.5 font-medium">
          {formContent.messagePlaceholder} <span className="text-accent-amber" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          disabled={status === 'SUBMITTING'}
          value={formData.message}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined });
          }}
          placeholder="Mô tả cơ hội hợp tác, vị trí quản lý hoặc dự án âm nhạc..."
          className={`w-full px-4 py-3 rounded-md bg-bg-surface border text-ink-hero placeholder-ink-muted/60 text-sm focus:bg-bg-elevated transition-colors duration-150 outline-none resize-none ${
            fieldErrors.message
              ? 'border-red-500/80 focus:border-red-400'
              : 'border-edge-subtle focus:border-edge-accent'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="mt-1 text-xs font-mono text-red-400" role="alert">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Status Announcements (Success & Server Error) */}
      {status === 'SUCCESS' && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 rounded-md text-xs font-mono bg-accent-amber/10 border border-accent-amber/30 text-accent-amber flex items-start justify-between gap-3 animate-fadeIn"
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent-amber" />
            <span className="leading-relaxed">{serverMessage}</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] underline hover:text-white uppercase flex-shrink-0"
          >
            Gửi thêm
          </button>
        </div>
      )}

      {status === 'SERVER_ERROR' && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-md text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-2.5 animate-fadeIn"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{serverMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'SUBMITTING'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-accent-amber text-bg-base font-heading font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'SUBMITTING' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{formContent.submitting}</span>
            </>
          ) : (
            <>
              <span>{formContent.submitBtn}</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {status === 'VALIDATION_ERROR' && (
          <span className="text-xs font-mono text-red-400">
            Vui lòng kiểm tra lại các trường thông tin.
          </span>
        )}
      </div>

    </form>
  );
};

