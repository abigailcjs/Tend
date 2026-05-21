import { TendIdentityDetail } from '@/components/identity/identity-detail';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TendIdentityDetail identityId={id} />;
}
