import DomainManagement from "../../../../../components/settings/domain/details/Detail";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <DomainManagement id={slug} />;
}
