export const topics = [
  { id: 'all', label: 'All topics' },
  { id: 'vcf', label: 'VMware Cloud Foundation' },
  { id: 'vsphere', label: 'vSphere & ESXi' },
  { id: 'automation', label: 'Automation' },
  { id: 'community', label: 'Community' },
] as const;

export function topicFor(slug: string, title: string): { id: string; label: string } {
  const text = `${slug} ${title}`.toLowerCase();
  if (/explore|vexpert|creation-of-blog/.test(text)) return { id: 'community', label: 'Community' };
  if (/ansible|automation|api-|operations-to-slack|payload|first-automation/.test(text)) return { id: 'automation', label: 'Automation' };
  if (/vcf|wld|fleet|paif|hcx|skyline|diagnostic/.test(text)) return { id: 'vcf', label: 'VMware Cloud Foundation' };
  return { id: 'vsphere', label: 'vSphere & ESXi' };
}

export function readingMinutes(body: string): number {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220));
}

export function summaryFor(description: string | undefined, body: string): string {
  const existing = (description || '').trim();
  if (existing && !/^Discover insights on virtualization and cloud-native technologies\./i.test(existing)) return existing;
  const paragraphs = body.split(/\n\s*\n/);
  const candidate = paragraphs
    .map(p => p.trim())
    .find(p => p.length > 90 && !/^(#|<|!\[|\||-|\* |```)/.test(p));
  if (!candidate) return 'Hands-on notes and lessons from the VirtualViking lab.';
  const cleaned = candidate
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= 190) return cleaned;
  return cleaned.slice(0, 190).replace(/\s+\S*$/, '') + '…';
}
