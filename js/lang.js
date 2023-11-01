$(document).ready(function() {
    $('.language').click(function() {
        $('.language ul').toggleClass('show-list');
    });

    $('.language ul li a').click(function(e) {
        e.stopPropagation();
        $('.language ul').removeClass('show-list');
    });
});

$(function () {
    //Português
    $(".br").click(function () {
        event.preventDefault();

        //Título da página
        $("title").text("Vinicius Florencio | Estudante de ADS")

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
        $("#container-hero p").html('Estudante de Análise e Desenvolvimento<br> de Sistemas - Fatec Rubens Lara <br> UI/UX Design & Web Development');

        //Sobre
        $("#sobre-box h2").text('Sobre mim');
        $("#sobre-box p").html('Me chamo <span class="texto-destaque">Vinicius Ferreira Florencio</span>, tenho 24 anos e sou morador de São Vicente na Baixada Santista. Sou apaixonado por pets, videogames, fantasia, <span class="texto-destaque">Nightwish</span> e tecnologia.<br><br>Estou cursando o terceiro semestre de <span class="texto-destaque">Tecnologia em Análise e Desenvolvimento de Sistemas</span> na Fatec Rubens Lara, no período noturno, com previsão de término em julho de 2025. Também já cursei um semestre de <span class="texto-destaque">Tecnologia em Sistemas Para Internet</span>, na mesma instituição.<br><br>Possuo fácil acesso à região metropolitana de São Paulo e estou em busca de uma <span class="texto-destaque">oportunidade de estágio</span> para poder aplicar os meus conhecimentos técnicos e acadêmicos e me inserir no mercado de trabalho.');
        
        //Experiência
        $("#experiencia-titulo h2").text('Experiência');
        $("#experiencia-titulo p").html('<a href="/files/CV - Vinicius Ferreira Florencio.pdf" target=”_blank”>Currículo completo ⤓</a>');
      
        //Experiencia 1
        $("#experiencia1 h3").text('Auxiliar de Bibliotecário');
        $("#experiencia1 h4").html('<span class="texto-destaque">Prefeitura da Estância Balneária de Praia Grande</span>');
        $("#experiencia1 p").html('Em outubro de 2022, assumi a posição de <span class="texto-destaque">Auxiliar de Bibliotecário</span> na <span class="texto-destaque">E.M. Ronaldo  Sérgio Lameira Alves Ramos</span>, onde fiquei encarregado da gestão da biblioteca.<br> Mantive essa função até fevereiro de 2023, quando tomei a decisão de me desligar para me concentrar nos meus estudos.');
        
        //Experiencia2
        $("#experiencia2 h3").text('Agente Administrativo');
        $("#experiencia2 h4").html('<span class="texto-destaque">Prefeitura da Estância Balneária de Praia Grande</span>');
        $("#experiencia2 p").html('Trabalhei na <span class="texto-destaque">E.M. Thereza Magri</span> de dezembro de 2018 até janeiro de 2022 e, em seguida, na <span class="texto-destaque">E.M. São Francisco de Assis</span> de janeiro a outubro de 2022.<br> Durante esse período desempenhei um papel fundamental na administração das escolas, atendendo tanto ao público como aos membros da equipe.');
        
        //Experiencia3
        $("#experiencia3 h3").text('Estagiário');
        $("#experiencia3 h4").html('<span class="texto-destaque">Tribunal Regional Eleitoral de SP</span>');
        $("#experiencia3 p").html('Durante o meu último ano no <span class="texto-destaque">Ensino Médio</span>, pude conciliar meus estudos com a realização de 1.040 horas de trabalho administrativo na <span class="texto-destaque">177ª Zona Eleitoral de São Vicente</span>.<br>Lá tive meu primeiro contato com o atendimento ao público e pude aprender sobre as boas práticas em um ambiente de trabalho.');
        
        //Projetos
        $("#projetos-titulo h2").text('Projetos');

        //Projeto Willian Metzger
        $("#projeto-willian p").html('Aplicação web de Willian Metzger, desenvolvida em <span class="texto-destaque">HTML5</span>, <span class="texto-destaque">CSS3</span>, e <span class="texto-destaque">JavaScript</span>. O objetivo do website é expor projetos pessoais e profissionais do desenvolvedor, assim como seus canais de contato. O projeto está em fase final de desenvolvimento.');
        
        //Projeto Portfólio
        $("#projeto-portfolio h3").html('<span class="texto-destaque">Portfólio pessoal</span>');
        $("#projeto-portfolio p").html('Minha primeira página web pessoal. Produzida de forma 100% autônoma, essa página totalmente responsiva foi criada utilizando <span class="texto-destaque"> HTML5</span>, <span class="texto-destaque">CSS3</span> e um pouco de <span class="texto-destaque">jQuery</span>. <br> O objetivo dessa página é promover meus projetos pessoais e atrair possíveis contratantes e clientes. <br><br><a href="https://github.com/Vinocas/vinocas.github.io" target=”_blank”>Repositório do projeto ⤓</a>');
        
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
        $("title").text("Vinicius Florencio | SAD Student")

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
        $("#container-hero p").html('System Analysis and Development<br> Student - Fatec Rubens Lara <br> UI/UX Design & Web Development');

        //Sobre
        $("#sobre-box h2").text('About me');
        $("#sobre-box p").html('My name is <span class="texto-destaque">Vinicius Ferreira Florencio</span>, I am 24 years old and I live in São Vicente in Baixada Santista. I am passionate about pets, video games, fantasy, <span class="texto-destaque">Nightwish</span> and technology.<br><br>I am studying <span class="texto-destaque">System Analysis and Development</span> at Fatec Rubens Lara, in the evening, expected to end in July 2025. I have also already studied a semester of <span class="texto-destaque">Technology in Internet Systems</span>, at the same institution.<br><br>I have easy access to the metropolitan region of São Paulo and I am looking for an <span class="texto-destaque">internship opportunity</span> so I can apply my technical and academic knowledge and enter the job market.');
        
        //Experiência
        $("#experiencia-titulo h2").text('Experience');
        $("#experiencia-titulo p").html('<a href="/files/CV-en - Vinicius Ferreira Florencio.pdf" target=”_blank”>Full resume ⤓</a>');
      
        //Experiencia 1
        $("#experiencia1 h3").text('Librarian Assistant');
        $("#experiencia1 h4").html('<span class="texto-destaque">Praia Grande City Hall</span>');
        $("#experiencia1 p").html('In October 2022 I took on the position of <span class="texto-destaque">Librarian Assistant</span> at <span class="texto-destaque">E.M. Ronaldo  Sérgio Lameira Alves Ramos</span>, where I was in charge of managing the library.<br> I maintained this role until February 2023, when I made the decision to leave to focus on my studies');
        
        //Experiencia2
        $("#experiencia2 h3").text('Administrative Agent');
        $("#experiencia2 h4").html('<span class="texto-destaque">Praia Grande City Hall</span>');
        $("#experiencia2 p").html('I worked at <span class="texto-destaque">E.M. Thereza Magri</span> from December 2018 until January 2022 and then at <span class="texto-destaque">E.M. São Francisco de Assis</span> from January to October 2022.<br> During this period I played a fundamental role in the administration of both schools, serving both the public and team members.');
        
        //Experiencia3
        $("#experiencia3 h3").text('Intern');
        $("#experiencia3 h4").html('<span class="texto-destaque">Regional Electoral Court of SP</span>');
        $("#experiencia3 p").html('During my last year in <span class="texto-destaque">High School</span> I was able to combine my studies with carrying out 1,040 hours of administrative work in the <span class="texto-destaque">177th Electoral Zone of São Vicente</span>.<br>There I had my first contact with customer service and was able to learn about good practices in a work environment.');
        
        //Projetos
        $("#projetos-titulo h2").text('Projects');

        //Projeto Willian Metzger
        $("#projeto-willian p").html('Web application for Willian Metzger, developed in <span class="texto-destaque">HTML5</span>, <span class="texto-destaque">CSS3</span>, and <span class="texto-destaque">JavaScript</span>. The website&#39;s objective is to showcase the developer&#39;s personal and professional projects, as well as their contact channels. The project is in the final stage of development.');
        
        //Projeto Portfólio
        $("#projeto-portfolio h3").html('<span class="texto-destaque">Personal portfolio</span>');
        $("#projeto-portfolio p").html('My first personal web page. Produced 100% autonomously, this fully responsive page was created using <span class="texto-destaque">HTML5</span>, <span class="texto-destaque">CSS3</span> and a little of <span class="texto-destaque">jQuery</span>. <br> The purpose of this page is to promote my personal projects and attract potential contractors and clients. <br><br><a href="https://github.com/Vinocas/vinocas.github.io" target=”_blank”>Project repository ⤓</a>');
        
        //Contatos
        $("#fale-comigo h4").text('Contact me');
        $("#fale-comigo p").text('If you are interested in my work or want to ask questions regarding any of my projects, please contact me.');
        return false;
    });
});