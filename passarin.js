<!DOCTYPE html>
<html lang="en">
    <head>
        <!--Isso classifica quais caracteres vão ser utilizados-->
        <meta charset="UTF-8">
        <!--Define o tamanho-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--adiciona a biblioteca do phaser-->
        <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
        <!--Título da aba-->
        <title>Pássarinho pegando a presa</title>

        <!--Centraliza tudo dentro da aba do browser-->
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;  }
        </style>
    </head>

    <body>
        <script>

            var config = {
                //aqui eu to definindo o tamanho da tela e falando que funções vão ser usadas na cena
                type: Phaser.AUTO,
                width: 800,
                height: 600,

                scene: {
                    preload: preload,
                    create: create,
                    update: update
                }
            };
            
            //definindo variáveis
            var game = new Phaser.Game(config);
            var volta = false;
            var passarinho;
            var minhoca;
            var flip = true;

            function preload() {
                //fazendo upload das imagens pro site
                this.load.image('bg', 'assets/bg_space.png');
                //link de onde eu tirei a imagem da minhoca(https://br.vexels.com/png-svg/previsualizar/232967/tra-o-de-cor-de-minhoca-simples)
                this.load.image('minhoca', 'assets/minhoca.png');
                this.load.spritesheet('bird', 'assets/bird-purple.png',{frameWidth:75,frameHeight:75});
            }

            function create() {
                //criando as imagens na tela
                this.add.image(400, 300, 'bg').setScale(1.2);
                minhoca = this.add.image(400, 550, 'minhoca').setScale(0.15);
                passarinho = this.add.sprite(100,300,'bird').setScale(1.3);

                //ativando a animação do passarinho
                this.anims.create({
                    key: 'fly',
                    frames: this.anims.generateFrameNumbers('bird',{start:0,end:7}),
                    frameRate:10,
                    repeat:-1
                });
                passarinho.anims.play('fly',true);
            }

            function update() {
                //movimento de ida e volta do pássaro
                if(passarinho.x <= 700 && volta == false){
                    passarinho.x += 2;
                    if(passarinho.x == 700){
                        passarinho.setFlip(true);
                        volta = true;
                    }
                }
                else if(passarinho.x >= 100 && volta == true){
                    passarinho.x -= 2;
                    if (passarinho.x == 100){
                        volta = false;
                        passarinho.setFlip(false);
                    }
                }

                //passando as mudanças de posição para o pássaro na tela
                var x = passarinho.x;
                var y = passarinho.y;

                //movimento vertical seguindo uma função quadrática para que o pássaro fizesse uma parábola
                //y = (-1/180) * (x - 400) * (x - 400) + 500
                y = -((x*x - 800*x + 160000)/180) + 500;
                console.log(y);
                passarinho.y = y;
                    
                //fazendo a minhoca girar quando o pássaro passa por ela
                while (y == 500){
                    minhoca.setFlip(flip);
                    flip = !flip;
                    console.log('flip');
                    break;
                }
            }

        </script>
    </body>
</html>
