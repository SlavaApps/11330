export function formatMoney(value: number): string {
  return `$${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)}`;
}

export function formatClock(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, '0');
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${String(rest).padStart(2, '0')}m`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function relativeDay(iso: string, reference = new Date()): string {
  const date = new Date(iso);
  const days = Math.round(
    (new Date(reference.getFullYear(), reference.getMonth(), reference.getDate()).getTime() -
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) /
      86400000,
  );
  if (days === 0) {
    return 'today';
  }
  if (days === 1) {
    return 'yesterday';
  }
  if (days > 1 && days < 7) {
    return `${days} days ago`;
  }
  return formatShortDate(iso);
}

export function greeting(reference = new Date()): string {
  const hour = reference.getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 18) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

export function formatMemberNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) {
    return digits;
  }
  return `${digits.slice(0, 4)} · ${digits.slice(4)}`;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '—';
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural ?? `${singular}s`;
}
