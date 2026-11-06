import { Card, PageHeader, SimBanner } from "@/components/ui";

const itens = [["TV ao vivo","Canais, categorias, logotipos, EPG, fonte de transmissão autorizada e status."],["Filmes e séries","Capas, sinopses, gêneros, temporadas, episódios, fonte de reprodução autorizada, licença de distribuição e validade dos direitos."],["Regra de conteúdo","Somente fontes licenciadas. Sem captura de sinais protegidos nem contorno de DRM."]];

export default function Page() {
  return (
    <>
      <PageHeader title="Gestão de conteúdo" desc="Catálogo próprio ou licenciado." />
      <SimBanner>tela de planejamento. Estes módulos serão construídos após a validação das telas prioritárias.</SimBanner>
      <div className="grid gap-3 sm:grid-cols-2">
        {itens.map(([t, d]) => (<Card key={t}><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-mute">{d}</p></Card>))}
      </div>
    </>
  );
}
