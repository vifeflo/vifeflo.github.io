import { Fragment, useLayoutEffect, useState } from "react"
import ArrowLink from "../components/arrowLink"
import Divider from "../components/divider"
import DashedDivider from "../components/dashedDivider"
import Footer from "../components/footer"
import Header from "../components/header"
import Navbar from "../components/navbar"
import ProjectImage from "../components/projectImage"
import StatGrid from "../components/statGrid"

const sectionNav = [
  ["basic-ui-kit-inicio", "INÍCIO"],
  ["basic-ui-kit-design-tokens", "DESIGN TOKENS"],
  ["basic-ui-kit-cores", "CORES"],
  ["basic-ui-kit-multi-marca", "SISTEMA MULTI-MARCA"],
  ["basic-ui-kit-modo-escuro", "MODO ESCURO"],
  ["basic-ui-kit-grid", "GRID RESPONSIVO"],
  ["basic-ui-kit-elevacao", "ELEVAÇÃO"],
  ["basic-ui-kit-componentes", "COMPONENTES"],
] as const

const navbarSections = sectionNav.map(([id, label]) => ({ id, label }))

const statItems = [
  ["32", "componentes reutilizáveis"],
  ["2 temas", "claro e escuro"],
  ["5 grids", "responsivos"],
  ["4", "marcas diferentes"],
] as const

type ColorShade = {
  token: string
  hex: string
}

type ColorPalette = {
  name: string
  description: string
  shades: ColorShade[]
}

const colorPalettes: ColorPalette[] = [
  {
    name: "Vermelho",
    description:
      "Cores semânticas usadas para comunicar erro e aplicadas em alertas críticos, ações destrutivas, falhas e mensagens de erro.",
    shades: [
      { token: "50", hex: "#FEF6F6" },
      { token: "75", hex: "#FCEDED" },
      { token: "100", hex: "#F9D7D7" },
      { token: "200", hex: "#F5BCBC" },
      { token: "300", hex: "#F09898" },
      { token: "400", hex: "#EB7070" },
      { token: "500", hex: "#E15656" },
      { token: "600", hex: "#DF2020" },
      { token: "700", hex: "#BB1B1B" },
      { token: "800", hex: "#8F1414" },
      { token: "900", hex: "#7D1212" },
      { token: "1000", hex: "#5E0D0D" },
      { token: "1100", hex: "#4C0B0B" },
      { token: "1200", hex: "#2D0606" },
      { token: "1300", hex: "#160303" },
    ],
  },
  {
    name: "Amarelo",
    description:
      "Cores semânticas usadas para comunicar alerta e aplicadas em recomendações e status intermediários.",
    shades: [
      { token: "50", hex: "#FEFCF6" },
      { token: "75", hex: "#FCF9ED" },
      { token: "100", hex: "#F9F1D7" },
      { token: "200", hex: "#F5E7BB" },
      { token: "300", hex: "#F1DB9A" },
      { token: "400", hex: "#EBCC70" },
      { token: "500", hex: "#E6C151" },
      { token: "600", hex: "#DFAF20" },
      { token: "700", hex: "#BB931B" },
      { token: "800", hex: "#8F7014" },
      { token: "900", hex: "#7D6212" },
      { token: "1000", hex: "#5E4A0D" },
      { token: "1100", hex: "#4C3C0B" },
      { token: "1200", hex: "#362A08" },
      { token: "1300", hex: "#1F1904" },
    ],
  },
  {
    name: "Verde",
    description:
      "Cores semânticas usadas para comunicar sucesso e aplicadas em confirmações, ações completas e indicadores positivos.",
    shades: [
      { token: "50", hex: "#F7FDF8" },
      { token: "75", hex: "#EFFAF1" },
      { token: "100", hex: "#DBF5E0" },
      { token: "200", hex: "#C4EECB" },
      { token: "300", hex: "#A4E5AF" },
      { token: "400", hex: "#81DA8F" },
      { token: "500", hex: "#40BF55" },
      { token: "600", hex: "#29A33D" },
      { token: "700", hex: "#148F29" },
      { token: "800", hex: "#107020" },
      { token: "900", hex: "#0D5919" },
      { token: "1000", hex: "#0B4C15" },
      { token: "1100", hex: "#083A11" },
      { token: "1200", hex: "#062D0D" },
      { token: "1300", hex: "#031606" },
    ],
  },
  {
    name: "Azul",
    description:
      "Cores semânticas usadas com caráter informativo e aplicadas em banners, notificações e textos de ajuda.",
    shades: [
      { token: "50", hex: "#F6FAFE" },
      { token: "75", hex: "#EBF5FF" },
      { token: "100", hex: "#D1E8FF" },
      { token: "200", hex: "#B2D9FF" },
      { token: "300", hex: "#99CCFF" },
      { token: "400", hex: "#66B2FF" },
      { token: "500", hex: "#3399FF" },
      { token: "600", hex: "#198CFF" },
      { token: "700", hex: "#0073E5" },
      { token: "800", hex: "#0059B2" },
      { token: "900", hex: "#004080" },
      { token: "1000", hex: "#003366" },
      { token: "1100", hex: "#00264C" },
      { token: "1200", hex: "#001F3D" },
      { token: "1300", hex: "#001429" },
    ],
  },
  {
    name: "Laranja",
    description:
      "Cores de marca usadas na identidade visual dos elementos gráficos.",
    shades: [
      { token: "50", hex: "#FEF9F5" },
      { token: "75", hex: "#FCF2ED" },
      { token: "100", hex: "#F9E2D7" },
      { token: "200", hex: "#F5CEBB" },
      { token: "300", hex: "#F1B79A" },
      { token: "400", hex: "#EB9970" },
      { token: "500", hex: "#E68351" },
      { token: "600", hex: "#DF6020" },
      { token: "700", hex: "#BB501B" },
      { token: "800", hex: "#8F3D14" },
      { token: "900", hex: "#7D3612" },
      { token: "1000", hex: "#5E280D" },
      { token: "1100", hex: "#4C210B" },
      { token: "1200", hex: "#361708" },
      { token: "1300", hex: "#1F0D04" },
    ],
  },
  {
    name: "Grama",
    description:
      "Cores de marca usadas na identidade visual dos elementos gráficos.",
    shades: [
      { token: "50", hex: "#F7FDFA" },
      { token: "75", hex: "#EFFAF6" },
      { token: "100", hex: "#DBF5EA" },
      { token: "200", hex: "#C4EEDC" },
      { token: "300", hex: "#A4E5C9" },
      { token: "400", hex: "#81DAB3" },
      { token: "500", hex: "#40BF88" },
      { token: "600", hex: "#2E9E6D" },
      { token: "700", hex: "#247B55" },
      { token: "800", hex: "#1D6344" },
      { token: "900", hex: "#0C5535" },
      { token: "1000", hex: "#0A472D" },
      { token: "1100", hex: "#083622" },
      { token: "1200", hex: "#062819" },
      { token: "1300", hex: "#03160E" },
    ],
  },
  {
    name: "Indigo",
    description:
      "Cores de marca usadas na identidade visual dos elementos gráficos.",
    shades: [
      { token: "50", hex: "#F6F6FE" },
      { token: "75", hex: "#EDEDFC" },
      { token: "100", hex: "#D7D7F9" },
      { token: "200", hex: "#BBBBF5" },
      { token: "300", hex: "#9A9AF1" },
      { token: "400", hex: "#7070EB" },
      { token: "500", hex: "#5151E6" },
      { token: "600", hex: "#3232E2" },
      { token: "700", hex: "#1B1BBB" },
      { token: "800", hex: "#14148F" },
      { token: "900", hex: "#12127D" },
      { token: "1000", hex: "#0D0D5E" },
      { token: "1100", hex: "#0B0B4C" },
      { token: "1200", hex: "#06062D" },
      { token: "1300", hex: "#030316" },
    ],
  },
  {
    name: "Magenta",
    description:
      "Cores de marca usadas na identidade visual dos elementos gráficos.",
    shades: [
      { token: "50", hex: "#FEF6FA" },
      { token: "75", hex: "#FCEDF5" },
      { token: "100", hex: "#F9D7E8" },
      { token: "200", hex: "#F5BBD8" },
      { token: "300", hex: "#F19AC5" },
      { token: "400", hex: "#EB70AD" },
      { token: "500", hex: "#E6519C" },
      { token: "600", hex: "#E2328A" },
      { token: "700", hex: "#BB1B6B" },
      { token: "800", hex: "#8F1452" },
      { token: "900", hex: "#7D1247" },
      { token: "1000", hex: "#5E0D35" },
      { token: "1100", hex: "#4C0B2B" },
      { token: "1200", hex: "#2D0619" },
      { token: "1300", hex: "#16030D" },
    ],
  },
  {
    name: "Cinza",
    description:
      "Cores neutras usadas nas estruturas da interface. Aplicadas em superfícies, textos, ícones, bordas, divisores, status desabilitados e outros elementos neutros.",
    shades: [
      { token: "0", hex: "#FFFFFF" },
      { token: "50", hex: "#FAFAFA" },
      { token: "75", hex: "#F5F5F5" },
      { token: "100", hex: "#E8E8E8" },
      { token: "200", hex: "#D8D8D8" },
      { token: "300", hex: "#C5C5C5" },
      { token: "400", hex: "#B3B3B3" },
      { token: "500", hex: "#9F9F9F" },
      { token: "600", hex: "#8C8C8C" },
      { token: "700", hex: "#7A7A7A" },
      { token: "800", hex: "#696969" },
      { token: "900", hex: "#585858" },
      { token: "1000", hex: "#474747" },
      { token: "1100", hex: "#363636" },
      { token: "1200", hex: "#242424" },
      { token: "1300", hex: "#131313" },
      { token: "1400", hex: "#000000" },
    ],
  },
  {
    name: "Sombras",
    description:
      "A paleta de sombras é composta por três níveis de elevação: Soft, Medium e Hard, provendo níveis consistentes de profundidade e hierarquia visual dos elementos gráficos.",
    shades: [
      { token: "Soft", hex: "rgba(0, 0, 0, 0.12)" },
      { token: "Medium", hex: "rgba(0, 0, 0, 0.18)" },
      { token: "Hard", hex: "rgba(0, 0, 0, 0.24)" },
    ],
  },
]

const colorApplications = [
  ["0", "Link invertido padrão"],
  ["50", "Base do layout"],
  ["75", "Superfícies"],
  [
    "100",
    "Superfícies sutis ou selecionadas, charts sutis e link invertido em hover",
  ],
  ["200", "Link invertido pressionado"],
  ["300", "Superfícies desabilitadas e bordas sutis"],
  ["500", "Textos e ícones desabilitados"],
  ["600", "Charts padrão"],
  ["700", "Bordas padrão"],
  [
    "800",
    "Textos e ícones sutis, charts acentuados e links acentuados",
  ],
  ["900", "Textos e ícones padrão"],
  [
    "1000",
    "Superfícies em hover, textos e ícones acentuados e links em hover",
  ],
  ["1100", "Superfícies pressionadas"],
  ["1200", "Links pressionados"],
] as const

type ResponsiveGridConfig = {
  name: string
  description: string
  specs: [string, string][]
  viewportWidth: number
  columns: number
  margin: number
  gap: number
  visualWidth: string
  aspectRatio: string
}

const responsiveGrids: ResponsiveGridConfig[] = [
  {
    name: "Desktop grande",
    description:
      "Projetado para telas grandes de computadores e TVs. Este grid aproveita ao máximo o espaço horizontal disponível, mantendo margens confortáveis para melhorar a legibilidade do conteúdo.",
    specs: [
      ["Viewport", "1920px"],
      ["Colunas", "12"],
      ["Margem", "80px"],
      ["Gap", "32px"],
    ],
    viewportWidth: 1920,
    columns: 12,
    margin: 80,
    gap: 32,
    visualWidth: "100%",
    aspectRatio: "16 / 10",
  },
  {
    name: "Desktop",
    description:
      "O layout padrão para experiências desktop, otimizado para telas widescreen convencionais, mantendo uma largura de conteúdo equilibrada.",
    specs: [
      ["Viewport", "1440px"],
      ["Colunas", "12"],
      ["Margem", "32px"],
      ["Gap", "20px"],
    ],
    viewportWidth: 1440,
    columns: 12,
    margin: 32,
    gap: 20,
    visualWidth: "88%",
    aspectRatio: "16 / 10",
  },
  {
    name: "Tablet",
    description:
      "Otimizado para dispositivos tablet, oferecendo flexibilidade suficiente ao layout e reduzindo o número de colunas para melhor acomodar telas de tamanho médio.",
    specs: [
      ["Viewport", "768px"],
      ["Colunas", "8"],
      ["Margem", "24px"],
      ["Gap", "24px"],
    ],
    viewportWidth: 768,
    columns: 8,
    margin: 24,
    gap: 24,
    visualWidth: "68%",
    aspectRatio: "4 / 5",
  },
  {
    name: "Mobile",
    description:
      "Projetado para smartphones modernos, equilibrando a flexibilidade do layout com espaçamentos que favorecem a legibilidade do conteúdo.",
    specs: [
      ["Viewport", "480px"],
      ["Colunas", "6"],
      ["Margem", "24px"],
      ["Gap", "16px"],
    ],
    viewportWidth: 480,
    columns: 6,
    margin: 24,
    gap: 16,
    visualWidth: "48%",
    aspectRatio: "9 / 16",
  },
  {
    name: "Mobile pequeno",
    description:
      "Otimizado para dispositivos móveis com espaço de tela limitado. A redução do número de colunas simplifica os layouts, preservando o alinhamento e a consistência dos espaçamentos.",
    specs: [
      ["Viewport", "320px"],
      ["Colunas", "4"],
      ["Margem", "16px"],
      ["Gap", "16px"],
    ],
    viewportWidth: 320,
    columns: 4,
    margin: 16,
    gap: 16,
    visualWidth: "38%",
    aspectRatio: "9 / 16",
  },
]

type ElevationLevel = {
  name: string
  layer: string
  x: number
  y: number
  blur: number
  lightOpacity: number
  darkOpacity: number
}

const elevationLevels: ElevationLevel[] = [
  {
    name: "SOFT",
    layer: "CAMADA 1",
    x: 0,
    y: 2,
    blur: 4,
    lightOpacity: 12,
    darkOpacity: 40,
  },
  {
    name: "MEDIUM",
    layer: "CAMADA 2",
    x: 0,
    y: 6,
    blur: 12,
    lightOpacity: 18,
    darkOpacity: 50,
  },
  {
    name: "HARD",
    layer: "CAMADA 3",
    x: 0,
    y: 12,
    blur: 32,
    lightOpacity: 24,
    darkOpacity: 65,
  },
]

type ComponentProperty = {
  name: string
  type?: string
  description: string
}

type DocumentedComponent = {
  name: string
  image: string
  description: string[]
  properties: ComponentProperty[]
}

const documentedComponents: DocumentedComponent[] = [
  {
    name: "Accordion",
    image: "../assets/accordion.png",
    description: [
      "Organiza conteúdos relacionados em seções expansíveis, permitindo que os usuários exibam ou ocultem informações conforme necessário.",
      "Ajuda a reduzir a complexidade visual, facilitando a descoberta de conteúdo e a organização da página.",
    ],
    properties: [
      {
        name: "State",
        type: "VARIANT",
        description:
          "Define se o conteúdo do accordion está visível ou oculto: Collapsed, Expanded.",
      },
      {
        name: "Label",
        type: "STRING",
        description: "Texto do rótulo do accordion.",
      },
      {
        name: "Show leading slot",
        type: "BOOLEAN",
        description: "Controla a visibilidade do leading slot.",
      },
      {
        name: "Leading slot",
        type: "SLOT",
        description:
          "Exibe conteúdo antes do rótulo do accordion. Este slot aceita apenas componentes de ícones compatíveis.",
      },
      {
        name: "Show trailing slot",
        type: "BOOLEAN",
        description: "Controla a visibilidade do trailing slot.",
      },
      {
        name: "Trailing slot",
        type: "SLOT",
        description:
          "Exibe conteúdo após o rótulo do accordion. Este slot aceita componentes de ícones e tags compatíveis.",
      },
      {
        name: "Content slot",
        type: "SLOT",
        description:
          "Define o conteúdo expansível exibido quando o accordion está expandido. Este slot aceita qualquer componente ou layout compatível, permitindo composições flexíveis de conteúdo.",
      },
    ],
  },
  {
    name: "Avatar",
    image: "../assets/avatar.png",
    description: [
      "Representa usuários, marcas, países ou entidades genéricas em toda a interface. Oferece um identificador visual consistente, com suporte a diferentes tipos de conteúdo e indicadores de status.",
      "O componente conta com quatro variantes, nove opções de tamanho e indicadores de presença opcionais, permitindo sua adaptação a diferentes cenários de uso do produto, mantendo a consistência em todo o Design System.",
    ],
    properties: [
      {
        name: "Size",
        type: "VARIANT",
        description:
          "Define as dimensões do avatar: 16, 24, 32, 40, 48, 56, 64, 72, 80.",
      },
      {
        name: "Variant",
        type: "VARIANT",
        description:
          "Define o conteúdo exibido pelo avatar: Text, Image, Icon, Flag.",
      },
      {
        name: "Show status badge",
        type: "BOOLEAN",
        description: "Controla a visibilidade do indicador de status.",
      },
      {
        name: "Label content",
        type: "STRING",
        description:
          "Define o texto exibido na variante Text. Geralmente utilizado para iniciais de usuários ou identificadores curtos.",
      },
      {
        name: "Icon",
        type: "SLOT",
        description:
          "Define o ícone exibido na variante Icon. Aceita qualquer componente de ícone ou logotipo de marca compatível.",
      },
      {
        name: "Flag",
        type: "SLOT",
        description:
          "Define a bandeira do país exibida na variante Flag. Aceita qualquer bandeira compatível com o componente Flag.",
      },
    ],
  },
  {
    name: "Breadcrumbs",
    image: "../assets/breadcrumbs.png",
    description: [
      "Indica a localização atual do usuário dentro da hierarquia de navegação. Apresenta um caminho claro para retornar aos níveis anteriores, ajudando os usuários a entender onde estão e a navegar pela aplicação com mais facilidade.",
    ],
    properties: [
      {
        name: "Breadcrumbs",
        type: "VARIANT",
        description:
          "Define o número de itens de breadcrumb exibidos na navegação: 1, 2, 3, 4, 5.",
      },
    ],
  },
  {
    name: "Button",
    image: "../assets/button.png",
    description: [
      "Permite que os usuários acionem ações, enviem dados ou naveguem entre telas. Comunica a importância de uma ação por meio de seu estilo visual e oferece suporte a ícones e badges opcionais para fornecer contexto adicional.",
    ],
    properties: [
      {
        name: "Variant",
        type: "VARIANT",
        description:
          "Define o estilo visual do botão: Brand, Ghost, Danger, White, Inverse.",
      },
      {
        name: "Size",
        type: "VARIANT",
        description: "Define as dimensões do botão: Large, Medium, Small.",
      },
      {
        name: "State",
        type: "VARIANT",
        description:
          "Define o estado visual e interativo do botão: Default, Hover, Pressed, Selected, Disabled.",
      },
      {
        name: "Label content",
        type: "STRING",
        description: "Define o texto exibido pelo botão.",
      },
      {
        name: "Show leading icon",
        type: "BOOLEAN",
        description: "Controla a visibilidade do ícone inicial.",
      },
      {
        name: "Leading icon",
        type: "SLOT",
        description:
          "Define o ícone exibido antes do rótulo do botão. Aceita qualquer componente de ícone compatível.",
      },
      {
        name: "Show trailing icon",
        type: "BOOLEAN",
        description: "Controla a visibilidade do ícone final.",
      },
      {
        name: "Trailing icon",
        type: "SLOT",
        description:
          "Define o ícone exibido após o rótulo do botão. Aceita qualquer componente de ícone compatível.",
      },
      {
        name: "Show badge",
        type: "BOOLEAN",
        description: "Controla a visibilidade do badge.",
      },
    ],
  },
  {
    name: "Checkbox",
    image: "../assets/checkbox.png",
    description: [
      "Permite que os usuários selecionem uma ou várias opções de uma lista. Também representa uma seleção parcial por meio do estado indeterminado, sendo adequado para seleções hierárquicas e ações em massa.",
    ],
    properties: [
      {
        name: "State",
        type: "VARIANT",
        description:
          "Define o estado visual e interativo do checkbox: Default, Hover, Pressed, Disabled.",
      },
      {
        name: "Toggle",
        type: "VARIANT",
        description:
          "Define o estado de seleção do checkbox: Unchecked, Checked, Indeterminate.",
      },
      {
        name: "Show label",
        type: "BOOLEAN",
        description: "Controla a visibilidade do rótulo do checkbox.",
      },
      {
        name: "Label content",
        type: "STRING",
        description: "Define o texto exibido ao lado do checkbox.",
      },
      {
        name: "Required",
        type: "BOOLEAN",
        description: "Indica se o campo associado é obrigatório.",
      },
    ],
  },
  {
    name: "Chip",
    image: "../assets/chip.png",
    description: [
      "Representa pequenas unidades de informação, atributos ou opções selecionáveis. Pode ser utilizado para categorizar conteúdos, filtrar dados ou exibir metadados, oferecendo suporte a ícones opcionais para fornecer contexto adicional.",
    ],
    properties: [
      {
        name: "State",
        type: "VARIANT",
        description:
          "Define o estado visual e interativo do chip: Default, Hover, Pressed, Selected, Disabled.",
      },
      {
        name: "Variant",
        type: "VARIANT",
        description: "Define o estilo visual do chip: Neutral, Danger.",
      },
      {
        name: "Label content",
        type: "STRING",
        description: "Define o texto exibido pelo chip.",
      },
      {
        name: "Show leading icon",
        type: "BOOLEAN",
        description: "Controla a visibilidade do ícone inicial.",
      },
      {
        name: "Leading icon",
        type: "SLOT",
        description:
          "Define o ícone exibido antes do rótulo do chip. Aceita qualquer componente de ícone compatível.",
      },
      {
        name: "Show trailing icon",
        type: "BOOLEAN",
        description: "Controla a visibilidade do ícone final.",
      },
      {
        name: "Trailing icon",
        type: "SLOT",
        description:
          "Define o ícone exibido após o rótulo do chip. Este slot aceita qualquer componente de ícones e tags compatíveis.",
      },
    ],
  },
  {
    name: "Datepicker",
    image: "../assets/datepicker.png",
    description: [
      "Permite que os usuários selecionem uma data específica ou um intervalo de datas por meio de um calendário interativo. Oferece navegação entre diferentes níveis de tempo, desde dias individuais até décadas.",
    ],
    properties: [
      {
        name: "Variant",
        type: "VARIANT",
        description:
          "Define a visualização do calendário exibida pelo seletor de datas: Day, Month, Year, Decade.",
      },
    ],
  },
  {
    name: "Dialog",
    image: "../assets/dialog.png",
    description: [
      "Exibe conteúdo em uma camada sobre a interface principal. É utilizado para apresentar informações específicas, decisões, formulários ou ações que exigem a atenção do usuário antes de retornar ao conteúdo subjacente.",
    ],
    properties: [
      {
        name: "Breakpoint",
        type: "VARIANT",
        description:
          "Define a configuração de viewport utilizada pelo dialog: Desktop Large, Desktop, Tablet, Mobile, Mobile Small.",
      },
      {
        name: "Size",
        type: "VARIANT",
        description:
          "Define a largura do dialog dentro do breakpoint selecionado: XLarge, Large, Medium, Small, XSmall.",
      },
      {
        name: "Title content",
        type: "STRING",
        description: "Define o título exibido no cabeçalho do dialog.",
      },
      {
        name: "Show eyebrow",
        type: "BOOLEAN",
        description:
          "Controla a visibilidade do texto de apoio exibido acima do título.",
      },
      {
        name: "Eyebrow content",
        type: "STRING",
        description:
          "Define o texto de apoio exibido acima do título do dialog.",
      },
    ],
  },
]

function ElevationTheme({ mode }: { mode: "light" | "dark" }) {
  const isLight = mode === "light"

  const canvasColor = isLight ? "#F5F5F5" : "#242424"
  const surfaceColor = isLight ? "#FFFFFF" : "#303030"
  const borderColor = isLight ? "#D8D8D8" : "#474747"

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <h3 className="font-['Instrument_Serif'] text-2xl leading-none text-[#faf9f6]">
        {isLight ? "Modo claro" : "Modo escuro"}
      </h3>

      <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
        {elevationLevels.map((level) => {
          const opacity = isLight ? level.lightOpacity : level.darkOpacity
          const shadow = `${level.x}px ${level.y}px ${level.blur}px rgba(0, 0, 0, ${opacity / 100})`

          return (
            <div key={level.name} className="flex min-w-0 flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="font-['IBM_Plex_Mono:Medium'] text-xs leading-4 text-[#ababab]">
                  {level.name}
                </p>

                <p className="	font-['Satoshi_Variable'] font-normal text-xs leading-4 text-[#696969]">
                  {level.layer}
                </p>
              </div>

              <div
                className="flex h-28 items-center justify-center p-4"
                style={{
                  backgroundColor: canvasColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <div
                  className="flex h-14 w-full max-w-32 flex-col justify-center gap-2 p-3"
                  style={{
                    backgroundColor: surfaceColor,
                    boxShadow: shadow,
                    border: `1px solid ${isLight ? "#EEEEEE" : "#363636"}`,
                  }}
                  role="img"
                  aria-label={`Amostra de sombra ${level.name.toLowerCase()} no modo ${isLight ? "claro" : "escuro"}`}
                >
                  <div
                    className="h-1.5 w-3/4"
                    style={{
                      backgroundColor: isLight ? "#D8D8D8" : "#585858",
                    }}
                  />
                  <div
                    className="h-1.5 w-1/2"
                    style={{
                      backgroundColor: isLight ? "#E8E8E8" : "#474747",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-['IBM_Plex_Mono:Medium'] text-[11px] leading-4 text-[#ababab]">
                  X: {level.x}px
                </p>
                <p className="font-['IBM_Plex_Mono:Medium'] text-[11px] leading-4 text-[#ababab]">
                  Y: {level.y}px
                </p>
                <p className="font-['IBM_Plex_Mono:Medium'] text-[11px] leading-4 text-[#ababab]">
                  BLUR: {level.blur}px
                </p>
                <p className="font-['IBM_Plex_Mono:Medium'] text-[11px] leading-4 text-[#ababab]">
                  OPACIDADE: {opacity}%
                </p>
                <p className="font-['IBM_Plex_Mono:Medium'] text-[11px] leading-4 text-[#ababab]">
                  COR: #000000
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ResponsiveGridExample({ grid }: { grid: ResponsiveGridConfig }) {
  const marginWidth = `${(grid.margin / grid.viewportWidth) * 100}%`
  const contentWidth = grid.viewportWidth - grid.margin * 2
  const gapWidth = `${(grid.gap / contentWidth) * 100}%`

  return (
    <div className="grid w-full grid-cols-8 items-start gap-x-6 max-md:grid-cols-1">
      <div className="col-span-3 flex min-w-0 flex-col items-start gap-3 max-md:col-span-1">
        <h3 className="font-['Instrument_Serif'] text-2xl leading-none text-[#faf9f6]">
          {grid.name}
        </h3>

        <p className="	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
          {grid.description}
        </p>

        <dl className="grid w-full grid-cols-8">
          {grid.specs.map(([label, value]) => (
            <div
              key={label}
              data-reveal
              className="col-span-8 grid grid-cols-8 gap-x-6 border-t border-[#363636] py-4 max-md:grid-cols-1 max-md:gap-y-2"
            >
              <div className="col-span-3 flex min-w-0 flex-col gap-1 max-md:col-span-1">
                <dt className="font-['Satoshi_Variable'] text-base font-medium leading-6 text-[#faf9f6]">
                  {label}
                </dt>
              </div>

              <dd className="col-span-5 min-w-0 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4] max-md:col-span-1">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="col-span-5 flex min-w-0 items-start justify-start gap-6 max-md:col-span-1">
        <div
          data-reveal
          className="responsive-grid-visual max-w-full shrink-0 overflow-hidden border border-[#474747] bg-[#202020]"
          style={{
            width: grid.visualWidth,
            aspectRatio: grid.aspectRatio,
          }}
          role="img"
          aria-label={`Representação visual do grid ${grid.name}: ${grid.columns} colunas, margem de ${grid.margin}px e espaçamento de ${grid.gap}px`}
        >
          <div
            className="grid h-full w-full"
            style={{
              boxSizing: "border-box",
              gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
              columnGap: gapWidth,
              paddingInline: marginWidth,
            }}
          >
            {Array.from({ length: grid.columns }, (_, index) => (
              <div
                key={index}
                className="h-full min-w-0"
                style={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentDocumentation({
  component,
}: {
  component: DocumentedComponent
}) {
  return (
    <article className="flex min-w-0 flex-col gap-6">
      <h3 className="font-['Instrument_Serif'] text-2xl leading-none text-[#faf9f6]">
        {component.name}
      </h3>

      <div className="grid grid-cols-8 items-start gap-x-6 gap-y-6 max-md:grid-cols-1">
        <div className="col-span-4 flex min-w-0 flex-col gap-4 max-md:col-span-1">
          {component.description.map((paragraph) => (
            <p
              key={paragraph}
              className="	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="col-span-4 min-w-0 max-md:col-span-1">
          <ProjectImage
            file={component.image}
            alt={`Exemplo do componente ${component.name} do Basic UI Kit`}
            className="!w-full max-w-full object-contain shadow-none"
          />
        </div>

        <div className="col-span-8 flex min-w-0 flex-col gap-4 max-md:col-span-1">
          <h4 className="font-['Satoshi_Variable'] text-base font-medium leading-6 text-[#faf9f6]">
            Propriedades
          </h4>

          <dl className="grid grid-cols-8">
            {component.properties.map((property) => (
              <div
                key={property.name}
                data-reveal
                className="component-property col-span-8 grid grid-cols-8 gap-x-6 border-t border-[#363636] py-4 max-md:grid-cols-1 max-md:gap-y-2"
              >
                <div className="col-span-3 flex min-w-0 flex-col gap-1 max-md:col-span-1">
                  <dt className="font-['Satoshi_Variable'] text-base font-medium leading-6 text-[#faf9f6]">
                    {property.name}
                  </dt>

                  {property.type && (
                    <span className="font-['IBM_Plex_Mono:Medium'] text-[10px] leading-4 text-[#ababab]">
                      {property.type}
                    </span>
                  )}
                </div>

                <dd className="col-span-5 min-w-0 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4] max-md:col-span-1">
                  {property.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  )
}

type BasicUIKitProjectProps = {
  onShowAbout: () => void
  onShowProjects: (projectId?: string) => void
}

export default function BasicUIKitProject({
  onShowAbout,
  onShowProjects,
}: BasicUIKitProjectProps) {
  const [activeSection, setActiveSection] = useState("basic-ui-kit-inicio")
  const [footerVisible, setFooterVisible] = useState(false)

  useLayoutEffect(() => {
    const sections = sectionNav
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting)

        if (current) {
          setActiveSection(current.target.id)
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    )

    sections.forEach((section) => sectionObserver.observe(section))

    const main = document.querySelector<HTMLElement>(
      "#basic-ui-kit-page main",
    )

    const observedItems = new WeakSet<HTMLElement>()
    const animationFrames = new Set<number>()

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const revealSelector = [
      "#basic-ui-kit-page main :is(h1,h2,h3,h4,p,li,blockquote,img,th,td)",
      "#basic-ui-kit-cores .palette-info",
      "#basic-ui-kit-cores .palette-swatch",
      "#basic-ui-kit-grid .responsive-grid-visual",
      ".component-property",
      "[data-reveal]",
      "#basic-ui-kit-contatos a",
    ].join(", ")

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLElement)) return

          const item = entry.target
          const isVisible = entry.isIntersecting

          item.style.opacity = isVisible ? "1" : "0"
          item.style.transform = isVisible
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, 24px, 0)"
        })
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    const shouldReveal = (item: Element) => {
      if (!item.matches(revealSelector)) return false

      if (item.matches("[data-reveal]")) return true

      const animatedParent = item.parentElement?.closest(
        ".palette-info, .palette-swatch",
      )

      return !animatedParent
    }

    const observeRevealItem = (item: Element) => {
      if (
        !(item instanceof HTMLElement) ||
        observedItems.has(item) ||
        prefersReducedMotion
      ) {
        return
      }

      item.style.opacity = "0"
      item.style.transform = "translate3d(0, 24px, 0)"
      item.style.transition =
        "opacity 680ms cubic-bezier(0.22, 1, 0.36, 1), transform 680ms cubic-bezier(0.22, 1, 0.36, 1)"
      item.style.willChange = "opacity, transform"

      observedItems.add(item)

      const firstFrame = window.requestAnimationFrame(() => {
        animationFrames.delete(firstFrame)

        const secondFrame = window.requestAnimationFrame(() => {
          animationFrames.delete(secondFrame)
          revealObserver.observe(item)
        })

        animationFrames.add(secondFrame)
      })

      animationFrames.add(firstFrame)
    }

    const observeRevealItemsWithin = (root: ParentNode) => {
      root.querySelectorAll(revealSelector).forEach((item) => {
        if (shouldReveal(item)) {
          observeRevealItem(item)
        }
      })

      if (root instanceof Element && shouldReveal(root)) {
        observeRevealItem(root)
      }
    }

    if (main) {
      observeRevealItemsWithin(main)
    }

    const contentMutationObserver = main
      ? new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              observeRevealItemsWithin(node)
            }
          })
        })
      })
      : null

    if (main && contentMutationObserver) {
      contentMutationObserver.observe(main, {
        childList: true,
        subtree: true,
      })
    }

    const footer = document.getElementById("basic-ui-kit-contatos")

    const footerObserver = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )

    if (footer) {
      footerObserver.observe(footer)
    }

    return () => {
      sectionObserver.disconnect()
      revealObserver.disconnect()
      contentMutationObserver?.disconnect()
      footerObserver.disconnect()

      animationFrames.forEach((frame) => {
        window.cancelAnimationFrame(frame)
      })
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div
      id="basic-ui-kit-page"
      className="min-h-dvh bg-[#1c1c1c] 	font-['Satoshi_Variable'] font-normal text-[#c4c4c4]"
    >
      <Header
        onGoHome={() => onShowProjects()}
        onOpenMovecta={() => onShowProjects("movecta")}
        onOpenBasic={() => onShowProjects("basic-ui-kit")}
        onShowProjects={onShowProjects}
        onShowAbout={onShowAbout}
      />

      <main className="page-grid items-start pt-32 max-md:pt-24">
        <Navbar
          sections={navbarSections}
          activeSection={activeSection}
          onNavigate={scrollTo}
          footerVisible={footerVisible}
        />

        <div className="col-start-4 col-end-12 row-start-1 flex min-w-0 flex-col gap-20 pb-20 max-md:col-start-2 max-md:gap-12 max-md:pb-12">
          <section
            id="basic-ui-kit-inicio"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <ProjectImage
              file="1fe14.png"
              alt="Capa do projeto Basic UI Kit v2.0"
            />

            <div className="flex flex-col gap-1">
              <p className="font-['IBM_Plex_Mono:Medium'] text-xs text-[#ababab]">
                BIBLIOTECA • COMPONENTES • FIGMA
              </p>

              <h1 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
                Basic UI Kit v2.0
              </h1>
            </div>

            <ArrowLink
              href="https://www.figma.com/design/slmVTBiLZeztmxhC2At6Cc/Basic-UI-Kit-v2.0.1?node-id=2050-20501&t=l9viVsRwAilzqiYY-1"
              className="w-fit"
            >
              ACESSAR NO FIGMA
            </ArrowLink>

            <p className="w-full text-base leading-[27px]">
              Um UI Kit autoral, escalável e multi-marca, desenvolvido com
              acessibilidade como princípio fundamental e consistência como
              premissa em cada componente.
            </p>

            <StatGrid items={statItems} />
          </section>

          <Divider />

          <section
            id="basic-ui-kit-design-tokens"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <h2 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
              Design tokens
            </h2>

            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
              <div className="flex w-full flex-col gap-6 text-left text-base leading-[27px]">
                <p>
                  O Basic UI Kit é baseado em tokens garantindo consistência e
                  escalabilidade. Cada decisão de design é armazenada como um
                  token reutilizável, tornando as atualizações perfeitas em todo
                  o sistema.
                </p>

                <p>
                  Todas as decisões de cores, sombras, espaçamentos, breakpoints,
                  tamanhos e condicionais booleanas são armazenadas como
                  variáveis que conversam entre si dentro do Figma.
                </p>

                <p>
                  Dessa forma a manutenção e a criação de novos componentes é
                  extremamente facilitada.
                </p>
              </div>

              <div className="w-full min-w-0">
                <ProjectImage
                  file="..assets/figma-variables.png"
                  alt="Variáveis e design tokens no Figma"
                  className="!w-auto max-w-full object-contain shadow-none"
                />
              </div>
            </div>
          </section>

          <Divider />

          <section
            id="basic-ui-kit-cores"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <h2 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
              Cores
            </h2>

            <p className="w-full text-base leading-[27px]">
              As paletas de cores são construídas com as diretrizes do WCAG 2.2
              em mente. Cada combinação de cores é testada para proporções de
              contraste, e ambos os modos claro e escuro são projetados para
              serem igualmente acessíveis.
            </p>

            <DashedDivider />

            <div className="flex flex-col gap-6">
              {colorPalettes.map((palette, index) => (
                <Fragment key={palette.name}>
                  <div className="grid grid-cols-8 items-start gap-x-6 max-md:grid-cols-1">
                    <div className="palette-info col-span-3 flex flex-col gap-2 max-md:col-span-1">
                      <h3 className="font-['Instrument_Serif'] text-2xl leading-none text-[#faf9f6]">
                        {palette.name}
                      </h3>

                      <p className="	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#ababab]">
                        {palette.description}
                      </p>
                    </div>

                    <div
                      className="col-span-5 grid min-w-0 items-start gap-x-4 gap-y-6 max-md:col-span-1"
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(min(100%, 64px), 1fr))",
                      }}
                    >
                      {palette.shades.map((shade) => (
                        <div
                          key={`${palette.name}-${shade.token}`}
                          className="min-w-0"
                        >
                          <div
                            className="palette-swatch aspect-square w-full rounded-[2px]"
                            style={{ backgroundColor: shade.hex }}
                            title={`${shade.token} · ${shade.hex}`}
                          />

                          <p className="mt-[3px] 	font-['Satoshi_Variable'] font-normal text-xs leading-4 text-[#ababab]">
                            {shade.token}
                          </p>

                          <p className="break-all 	font-['Satoshi_Variable'] font-normal text-[10px] leading-3 text-[#ababab]">
                            {shade.hex}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {index < colorPalettes.length - 1 && <DashedDivider />}
                </Fragment>
              ))}
            </div>

            <div className="flex w-full flex-col gap-4">
              <h3 className="font-['Satoshi_Variable'] text-base font-medium leading-6 text-[#faf9f6]">
                Aplicação das cores
              </h3>

              <dl className="grid grid-cols-8">
                {colorApplications.map(([token, description]) => (
                  <div
                    key={token}
                    data-reveal
                    className="component-property col-span-8 grid grid-cols-8 gap-x-6 border-t border-[#363636] py-4 max-md:grid-cols-1 max-md:gap-y-2"
                  >
                    <div className="col-span-3 flex min-w-0 flex-col gap-1 max-md:col-span-1">
                      <dt className="font-['Satoshi_Variable'] text-base font-medium leading-6 text-[#faf9f6]">
                        {token}
                      </dt>
                    </div>

                    <dd className="col-span-5 min-w-0 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4] max-md:col-span-1">
                      {description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <Divider />

          <section
            id="basic-ui-kit-multi-marca"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <h2 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
              Sistema multi-marca
            </h2>

            <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
              O Basic não é só UI Kit, é um sistema multi-marcas flexível criado
              a partir de uma única fonte de verdade. Cada marca mantém sua
              identidade única enquanto compartilha a mesma arquitetura de
              componentes.
            </p>

            <div className="grid grid-cols-4 items-start gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {[
                {
                  name: "INDIGO",
                  file: "../assets/indigo.png",
                  alt: "Identidade visual da marca Indigo",
                },
                {
                  name: "MAGENTA",
                  file: "../assets/magenta.png",
                  alt: "Identidade visual da marca Magenta",
                },
                {
                  name: "GRAMA",
                  file: "../assets/grama.png",
                  alt: "Identidade visual da marca Grama",
                },
                {
                  name: "LARANJA",
                  file: "../assets/laranja.png",
                  alt: "Identidade visual da marca Laranja",
                },
              ].map((brand) => (
                <div
                  key={brand.name}
                  className="flex min-w-0 flex-col items-start gap-3"
                >
                  <p className="w-full text-left font-['IBM_Plex_Mono:Medium'] text-xs leading-4 text-[#ababab]">
                    {brand.name}
                  </p>

                  <ProjectImage
                    file={brand.file}
                    alt={brand.alt}
                    className="!w-full max-w-full object-cover shadow-none"
                  />
                </div>
              ))}
            </div>
          </section>

          <Divider />

          <section
            id="basic-ui-kit-modo-escuro"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <h2 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
              Modo escuro
            </h2>

            <div className="flex flex-col gap-4">
              <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
                O modo escuro do{" "}
                <span className="font-['Satoshi_Variable'] font-medium">
                  Basic UI Kit
                </span>{" "}
                segue a mesma premissa de acessibilidade do modo claro, com
                padrões de contraste que seguem as diretrizes da{" "}
                <span className="font-['Satoshi_Variable'] font-medium">
                  WCAG 2.2
                </span>
                .
              </p>

              <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
                Desse modo, a paleta de cores é adaptada para o fundo escuro,
                mantendo a mesma escala de uso e a hierarquia visual do modo
                claro. Assim, os componentes preservam sua consistência visual e
                legibilidade em ambos os temas, garantindo uma experiência
                acessível e familiar aos usuários.
              </p>
            </div>

            <div className="grid grid-cols-2 items-start gap-6 max-sm:grid-cols-1">
              <div className="flex min-w-0 flex-col items-start gap-3">
                <p className="w-full text-left font-['IBM_Plex_Mono:Medium'] text-xs leading-4 text-[#ababab]">
                  MODO CLARO
                </p>

                <ProjectImage
                  file="modo-claro.png"
                  alt="Interface do Basic UI Kit no modo claro"
                  className="!w-full max-w-full object-cover shadow-none"
                />
              </div>

              <div className="flex min-w-0 flex-col items-start gap-3">
                <p className="w-full text-left font-['IBM_Plex_Mono:Medium'] text-xs leading-4 text-[#ababab]">
                  MODO ESCURO
                </p>

                <ProjectImage
                  file="modo-escuro.png"
                  alt="Interface do Basic UI Kit no modo escuro"
                  className="!w-full max-w-full object-cover shadow-none"
                />
              </div>
            </div>
          </section>

          <Divider />

          <section
            id="basic-ui-kit-grid"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <h2 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
              Grid responsivo
            </h2>

            <div className="flex flex-col gap-4">
              <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
                O sistema de grid proporciona uma estrutura de layout
                consistente em todos os breakpoints suportados, garantindo
                alinhamento, escalabilidade e comportamento responsivo em toda a
                interface. Ele é baseado em um sistema de colunas com margens e
                espaçamentos predefinidos que se adaptam a cada tamanho de
                viewport, mantendo a consistência dos espaços e o alinhamento
                do conteúdo.
              </p>

              <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
                O grid deve ser utilizado como base para a construção de layouts
                de páginas, o posicionamento de componentes e as decisões de
                design responsivo. Sempre que possível, o conteúdo deve seguir
                os limites das colunas para preservar o ritmo visual e melhorar
                a legibilidade em diferentes dispositivos.
              </p>
            </div>

            <DashedDivider />

            <div className="flex flex-col gap-12">
              {responsiveGrids.map((grid, index) => (
                <Fragment key={grid.name}>
                  <ResponsiveGridExample grid={grid} />

                  {index < responsiveGrids.length - 1 && <DashedDivider />}
                </Fragment>
              ))}
            </div>
          </section>

          <Divider />

          <section
            id="basic-ui-kit-elevacao"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <h2 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
              Elevação
            </h2>

            <div className="flex flex-col gap-4">
              <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
                As sombras são utilizadas para comunicar elevação, reforçar a
                hierarquia visual e ampliar a percepção de profundidade na
                interface. Devem ser aplicadas de forma consistente para
                diferenciar elementos flutuantes das superfícies ao redor, sem
                se tornarem o principal elemento visual.
              </p>

              <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
                O sistema de sombras é composto por três níveis de elevação
                predefinidos: Soft (camada 1), Medium (camada 2) e Hard (camada
                3), garantindo consistência na aplicação entre diferentes
                produtos. As sombras devem ser sutis, valorizar o conteúdo em
                vez de competir com ele e seguir um padrão de uso em todo o
                Design System, proporcionando uma experiência previsível aos
                usuários.
              </p>
            </div>

            <DashedDivider />

            <div className="grid grid-cols-2 items-start gap-x-8 gap-y-12 max-lg:grid-cols-1">
              <ElevationTheme mode="light" />
              <ElevationTheme mode="dark" />
            </div>
          </section>

          <Divider />

          <section
            id="basic-ui-kit-componentes"
            className="scroll-mt-32 flex flex-col gap-10"
          >
            <h2 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
              Componentes
            </h2>

            <div className="flex flex-col gap-4">
              <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
                O Basic UI Kit conta com{" "}
                <span className="font-['Satoshi_Variable'] font-medium text-[#faf9f6]">
                  32 componentes acessíveis
                </span>{" "}
                e documentados, desenvolvidos para garantir consistência visual,
                agilidade na prototipação e eficiência no desenvolvimento de
                interfaces.
              </p>

              <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
                Cada componente segue padrões de acessibilidade da{" "}
                <span className="font-['Satoshi_Variable'] font-medium text-[#faf9f6]">
                  WCAG 2.2
                </span>
                , com diretrizes de uso e variantes que facilitam sua aplicação
                em diferentes contextos e dispositivos.
              </p>
            </div>

            <DashedDivider />

            {documentedComponents.map((component) => (
              <Fragment key={component.name}>
                <ComponentDocumentation component={component} />
                <DashedDivider />
              </Fragment>
            ))}

            <p className="w-full 	font-['Satoshi_Variable'] font-normal text-base leading-[27px] text-[#c4c4c4]">
              Esses foram apenas alguns exemplos dos 32 componentes
              reutilizáveis disponíveis no Basic UI Kit. Para acessar a lista
              completa e utilizar a biblioteca, acesse o{" "}
              <a
                href="https://www.figma.com/design/slmVTBiLZeztmxhC2At6Cc/Basic-UI-Kit-v2.0.1?node-id=2050-20501&t=l9viVsRwAilzqiYY-1"
                target="_blank"
                rel="noreferrer"
                className="text-[#faf9f6] underline decoration-dotted underline-offset-4 transition-colors duration-200 hover:text-[#bdbdbd]"
              >
                arquivo no Figma
              </a>
              .
            </p>
          </section>

          <Divider />
        </div>

        <Footer id="basic-ui-kit-contatos" />
      </main>
    </div>
  )
}