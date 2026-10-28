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
