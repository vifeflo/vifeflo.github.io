$(document).ready(function () {
    $('.language').click(function () {
        $('.language ul').toggleClass('show-list');
    });

    $('.language ul li a').click(function (e) {
        e.stopPropagation();
        $('.language ul').removeClass('show-list');
    });
});

$(function () {
    //Português
    $(".br").click(function () {
        event.preventDefault();

        //Título da página
        $("title").text("Vinicius Florencio | Designer de Produtos Digitais")

        //Muda a bandeira para a linguagem selecionada
        $(".language-selected").removeClass("change-en");
        $(".language-selected").addClass("change-br");

        //Navegação
        $("#nav-inicio").text('Início');
        $("#nav-sobre").text('Sobre');
        $("#nav-experiencia").text('Experiência');
        $("#nav-projetos").text('Projetos');
        $("#nav-contatos").text('Contatos');

        //Hero
        $("#container-hero p").html('Designer de Produtos Digitais <br> UI&UX Designer');

        //Sobre
        $("#sobre-box h2").text('Sobre mim');
        $("#sobre-box p").html('Me chamo <span class="texto-destaque">Vinicius Ferreira Florencio</span>, tenho 25 anos e sou morador de São Vicente na Baixada Santista. Sou apaixonado por pets, videogames, fantasia, <span class="texto-destaque">Nightwish</span> e tecnologia.<br><br> Estou cursando <span class="texto-destaque">Tecnologia em Análise e Desenvolvimento de Sistemas</span> na Faculdade Santa Cecília, modalidade EAD, com previsão de término em dezembro de 2025. Também já cursei um semestre de <span class="texto-destaque">Tecnologia em Sistemas Para Internet</span>, na Fatec Rubens Lara.<br><br> Já me aventurei pelo universo front-end como desenvolvedor WordPress, porém me encontrei na área de <span class="texto-destaque">Design de Produtos Digitais</span> e <span class="texto-destaque">UI&UX Design</span> onde hoje dedico minha carreira na criação de soluções intuitivas e criativas.');

        //Experiência
        $("#experiencia-titulo h2").text('Experiência');
        $("#experiencia-titulo p").html('<a href="/files/CV - Vinicius Ferreira Florencio.pdf" target=”_blank”>Currículo completo ⤓</a>');

        //Experiencia 1
        $("#experiencia1 h3").text('Designer de Produtos Digitais');
        $("#experiencia1 h4").html('<span class="texto-destaque">ModalGR</span>');
        $("#experiencia1 p").html('Tenho experiência na <span class="texto-destaque">criação de wireframes e protótipos</span> de alta e baixa fidelidade e forte habilidade na análise e criação de requisitos funcionais, sempre focando na experiência do usuário e na satisfação do cliente.<br><br> Sou um dos principais responsáveis pela <span class="texto-destaque">criação de MVPs</span> que ajudam a fechar negócios com clientes estratégicos da empresa e atualmente estou supervisionando a criação do nosso novo <span class="texto-destaque">design system</span>. <br><br>Aplico testes A/B e testes de usabilidade para validar designs, além de utilizar a <span class="texto-destaque">metodologia SCRUM</span> na gestão de backlog de toda a equipe de design. Em 2024, tive a oportunidade de atuar como <span class="texto-destaque">mentor do time de estagiários de UI&UX Design</span> no 2º Processo de Formação ModalGR de 2024.');

        //Experiencia2
        $("#experiencia2 h3").text('Estagiário WordPress');
        $("#experiencia2 h4").html('<span class="texto-destaque">ModalGR</span>');
        $("#experiencia2 p").html('Em janeiro de 2024 eu fui selecionado no <span class="texto-destaque">Processo de Formação</span> da <span class="texto-destaque">ModalGR</span> e pude entrar no mercado de trabalho de tecnologia como desenvolvedor front-end com foco em WordPress.<br><br> Lá pude adquirir muita experiência no setor corporativo e no desenvolvimento de projetos ágeis e dinâmicos em equipe.');

        //Experiencia 3
        $("#experiencia3 h3").text('Auxiliar de Bibliotecário');
        $("#experiencia3 h4").html('<span class="texto-destaque">Prefeitura da Estância Balneária de Praia Grande</span>');
        $("#experiencia3 p").html('Em outubro de 2022, assumi a posição de <span class="texto-destaque">Auxiliar de Bibliotecário</span> na <span class="texto-destaque">E.M. Ronaldo  Sérgio Lameira Alves Ramos</span>, onde fiquei encarregado da gestão da biblioteca.<br><br> Mantive essa função até fevereiro de 2023, quando tomei a decisão de me desligar para me concentrar nos meus estudos.');

        //Experiencia4
        $("#experiencia4 h3").text('Agente Administrativo');
        $("#experiencia4 h4").html('<span class="texto-destaque">Prefeitura da Estância Balneária de Praia Grande</span>');
        $("#experiencia4 p").html('Trabalhei na <span class="texto-destaque">E.M. Thereza Magri</span> de dezembro de 2018 até janeiro de 2022 e, em seguida, na <span class="texto-destaque">E.M. São Francisco de Assis</span> de janeiro a outubro de 2022.<br><br> Durante esse período desempenhei um papel fundamental na administração das escolas, atendendo tanto ao público como aos membros da equipe.');

        //Experiencia5
        $("#experiencia5 h3").text('Estagiário');
        $("#experiencia5 h4").html('<span class="texto-destaque">Tribunal Regional Eleitoral de SP</span>');
        $("#experiencia5 p").html('Durante o meu último ano no <span class="texto-destaque">Ensino Médio</span>, pude conciliar meus estudos com a realização de 1.040 horas de trabalho administrativo na <span class="texto-destaque">177ª Zona Eleitoral de São Vicente</span>.<br><br>Lá tive meu primeiro contato com o atendimento ao público e pude aprender sobre as boas práticas em um ambiente de trabalho.');

        //Projetos
        $("#projetos-titulo h2").text('Projetos');

        //Projeto Willian Metzger
        $("#projeto-willian p").html('Aplicação web de Willian Metzger, desenvolvida em <span class="texto-destaque">HTML5</span>, <span class="texto-destaque">CSS3</span>, e <span class="texto-destaque">JavaScript</span>. <br><br>O objetivo do website é expor projetos pessoais e profissionais do desenvolvedor, assim como seus canais de contato. <br><br><a href="https://willianmetzger.github.io/" target=”_blank”>Visitar página ⤓</a>');

        //Projeto Portfólio
        $("#projeto-portfolio h3").html('<span class="texto-destaque">Portfólio pessoal</span>');
        $("#projeto-portfolio p").html('Minha primeira página web pessoal. Produzida de forma 100% autônoma, essa página totalmente responsiva foi criada utilizando <span class="texto-destaque"> HTML5</span>, <span class="texto-destaque">CSS3</span> e um pouco de <span class="texto-destaque">jQuery</span>. <br><br> O objetivo dessa página é promover meus projetos pessoais e atrair possíveis contratantes e clientes. <br><br><a href="https://github.com/Vinocas/vinocas.github.io" target=”_blank”>Repositório do projeto ⤓</a>');

        //Contatos
        $("#fale-comigo h4").text('Fale comigo');
        $("#fale-comigo p").text('Caso você tenha se interessado pelo meu trabalho ou queira tirar alguma dúvida referente a algum dos meus projetos, entre em contato comigo.');
        return false;
    });
});

$(function () {
    //English
    $(".en").click(function () {
        event.preventDefault();

        //Título da página
        $("title").text("Vinicius Florencio | Digital Product Designer")

        //Muda a bandeira para a linguagem selecionada
        $(".language-selected").removeClass("change-br");
        $(".language-selected").addClass("change-en");

        //Navegação
        $("#nav-inicio").text('Home');
        $("#nav-sobre").text('About');
        $("#nav-experiencia").text('Experience');
        $("#nav-projetos").text('Projects');
        $("#nav-contatos").text('Contacts');

        //Hero
        $("#container-hero p").html('Digital Product Designer <br> UI&UX Designer');

        //Sobre
        $("#sobre-box h2").text('About me');
        $("#sobre-box p").html('My name is <span class="texto-destaque">Vinicius Ferreira Florencio</span>, I am 25 years old and I live in São Vicente, in the Baixada Santista region. I am passionate about pets, video games, fantasy, <span class="texto-destaque">Nightwish</span>, and technology.<br><br> I am pursuing a degree in <span class="texto-destaque">Technology in Analysis and Development of Systems</span> at Faculdade Santa Cecília, distance learning modality, with an expected completion date in December 2025. I have also completed one semester of <span class="texto-destaque">Technology in Internet Systems</span> at Fatec Rubens Lara.<br><br> I have ventured into the front-end universe as a WordPress developer, but I found my passion in <span class="texto-destaque">Digital Product Design</span> and <span class="texto-destaque">UI&UX Design</span>, where I now dedicate my career to creating intuitive and creative solutions.');

        //Experiência
        $("#experiencia-titulo h2").text('Experience');
        $("#experiencia-titulo p").html('<a href="/files/CV EN - Vinicius Ferreira Florencio.pdf" target=”_blank”>Full resume ⤓</a>');

        //Experiencia 1
        $("#experiencia1 h3").text('Digital Product Designer');
        $("#experiencia1 h4").html('<span class="texto-destaque">ModalGR</span>');
        $("#experiencia1 p").html('I have experience in <span class="texto-destaque">creating wireframes and prototypes</span> of high and low fidelity and strong skills in analyzing and creating functional requirements, always focusing on user experience and customer satisfaction.<br><br> I am one of the main responsible for the <span class="texto-destaque">creation of MVPs</span> that help close deals with strategic clients of the company and I am currently supervising the creation of our new <span class="texto-destaque">design system</span>. <br><br>I apply A/B tests and usability tests to validate designs, in addition to using the <span class="texto-destaque">SCRUM methodology</span> in managing the entire design team&apos;s backlog. In 2024, I had the opportunity to act as <span class="texto-destaque">mentor for the UI &amp; UX Design interns</span> in the 2nd ModalGR Training Process of 2024.');

        //Experiencia2
        $("#experiencia2 h3").text('WordPress Intern');
        $("#experiencia2 h4").html('<span class="texto-destaque">ModalGR</span>');
        $("#experiencia2 p").html('In January 2024, I was selected for the <span class="texto-destaque">Training Process</span> at <span class="texto-destaque">ModalGR</span> and was able to enter the technology job market as a front-end developer focused on WordPress.<br><br> There I was able to gain a lot of experience in the corporate sector and in developing agile and dynamic projects in a team.');

        //Experiencia 3
        $("#experiencia3 h3").text('Library Assistant');
        $("#experiencia3 h4").html('<span class="texto-destaque">City Hall of Praia Grande</span>');
        $("#experiencia3 p").html('In October 2022, I took on the position of <span class="texto-destaque">Library Assistant</span> at <span class="texto-destaque">E.M. Ronaldo Sérgio Lameira Alves Ramos</span>, where I was responsible for managing the library.<br><br> I held this position until February 2023, when I decided to resign to focus on my studies.');

        //Experiencia4
        $("#experiencia4 h3").text('Administrative Agent');
        $("#experiencia4 h4").html('<span class="texto-destaque">City Hall of Praia Grande</span>');
        $("#experiencia4 p").html('I worked at <span class="texto-destaque">E.M. Thereza Magri</span> from December 2018 until January 2022 and then at <span class="texto-destaque">E.M. São Francisco de Assis</span> from January to October 2022.<br><br> During this period, I played a key role in the administration of the schools, serving both the public and the team members.');

        //Experiencia5
        $("#experiencia5 h3").text('Intern');
        $("#experiencia5 h4").html('<span class="texto-destaque">Regional Electoral Court of SP</span>');
        $("#experiencia5 p").html('During my last year in <span class="texto-destaque">High School</span>, I was able to balance my studies with 1,040 hours of administrative work at <span class="texto-destaque">177th Electoral Zone of São Vicente</span>.<br><br> There I had my first contact with customer service and was able to learn about best practices in a work environment.');

        //Projetos
        $("#projetos-titulo h2").text('Projects');

        //Projeto Willian Metzger
        $("#projeto-willian p").html('Web application of Willian Metzger, developed in <span class="texto-destaque">HTML5</span>, <span class="texto-destaque">CSS3</span>, and <span class="texto-destaque">JavaScript</span>. <br><br>The goal of the website is to showcase personal and professional projects of the developer, as well as their contact channels. <br><br><a href="https://willianmetzger.github.io/" target="_blank">Visit page ⤓</a>');

        //Projeto Portfólio
        $("#projeto-portfolio h3").html('<span class="texto-destaque">Personal Portfolio</span>');
        $("#projeto-portfolio p").html('My first personal web page. Produced completely autonomously, this fully responsive page was created using <span class="texto-destaque">HTML5</span>, <span class="texto-destaque">CSS3</span>, and a bit of <span class="texto-destaque">jQuery</span>. <br><br> The goal of this page is to promote my personal projects and attract potential employers and clients. <br><br><a href="https://github.com/Vinocas/vinocas.github.io" target="_blank">Project repository ⤓</a>');

        //Contatos
        $("#fale-comigo h4").text('Contact me');
        $("#fale-comigo p").text('If you are interested in my work or have any questions regarding any of my projects, feel free to reach out to me.');

        return false;
    });
});