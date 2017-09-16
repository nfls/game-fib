var game = new Phaser.Game(320, 505, Phaser.AUTO, 'game');
game.States = {};
var username;

game.States.boot = function () {
    this.preload = function () {
        if (!game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.forcePortrait = true;
            this.scale.refresh();
        }
        game.load.image('loading', 'assets/preloader.gif');
    };
    this.create = function () {
        game.state.start('preload');
    };
}

game.States.preload = function () {
    this.preload = function () {
        var preloadSprite = game.add.sprite(35, game.height / 2, 'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('background', 'assets/background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('title', 'assets/title.png');
        game.load.image('btn', 'assets/start-button.png');
        game.load.image('mathbooks', 'assets/mathbooks.png');
        game.load.bitmapFont('flappy_font', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');
        game.load.image('ready_text', 'assets/get-ready.png');
        game.load.image('play_tip', 'assets/instruction.png');
        game.load.image('game_over', 'assets/gameover.png');
        game.load.image('score_board', 'assets/scoreboard.png');
        game.load.image('nfls', 'assets/nfls.png');

        game.load.audio('bgm', 'assets/audios/bgm.ogg');
        game.load.audio('fly_sound', 'assets/audios/flap.wav');
        game.load.audio('score_sound', 'assets/audios/score.wav');
        game.load.audio('hit_pipe_sound', 'assets/audios/pipe-hit.wav');
        game.load.audio('hit_ground_sound', 'assets/audios/ouch.wav');

        game.load.image('candymao', 'assets/players/_CandyMao.png');
        game.load.image('erin', 'assets/players/_Erin.png');
        game.load.image('gabriel', 'assets/players/_Gabriel.png');
        game.load.image('jones', 'assets/players/_Jones.png');
        game.load.image('leigh', 'assets/players/_Leigh.png');
        game.load.image('linx', 'assets/players/_LinX.png');
        game.load.image('mark', 'assets/players/_Mark.png');
        game.load.image('nunu', 'assets/players/_Nunu.png');
        game.load.image('pangtt', 'assets/players/_PangTT.png');
        game.load.image('sidh', 'assets/players/_Sidh.png');
        game.load.image('timothy', 'assets/players/_Timothy.png');
        game.load.image('wusz', 'assets/players/_WuSZ.png');
        game.load.image('wuyh', 'assets/players/_WuYH.png');
        game.load.image('zhangk', 'assets/players/_ZhangK.png');
        game.load.image('ibo', 'assets/players/_IBO.png');
    }
    this.create = function () {
        game.state.start('menu');
    }
}

game.States.menu = function () {
    this.create = function () {
        game.add.tileSprite(0, 0, game.width, game.height, 'background').autoScroll(-10, 0);
        game.add.tileSprite(0, game.height - 112, game.width, 112, 'ground').autoScroll(-100, 0);
        var titleGroup = game.add.group();
        titleGroup.create(0, 0, 'title');
        var player = titleGroup.create(190, 10, 'ibo');
        player.animations.add('fly');
        player.animations.play('fly', 12, true);
        titleGroup.x = 35;
        titleGroup.y = 100;
        game.add.tween(titleGroup).to({y: 120}, 1000, null, true, 0, Number.MAX_VALUE, true);
        var btn = game.add.button(game.width / 2, game.height / 2, 'btn', function () {
            game.state.start('play');
        });
        btn.anchor.setTo(0.5, 0.5);
    }
}

game.States.play = function () {
    this.create = function () {
        this.bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        this.pipeGroup = game.add.group();
        this.pipeGroup.enableBody = true;
        this.ground = game.add.tileSprite(0, game.height - 112, game.width, 112, 'ground');
        this.playerType = getRandomNumber(1, 15);
        switch (this.playerType) {
            case 1: this.player = game.add.sprite(50, 150, 'candymao'); break;
            case 2: this.player = game.add.sprite(50, 150, 'erin'); break;
            case 3: this.player = game.add.sprite(50, 150, 'gabriel'); break;
            case 4: this.player = game.add.sprite(50, 150, 'jones'); break;
            case 5: this.player = game.add.sprite(50, 150, 'leigh'); break;
            case 6: this.player = game.add.sprite(50, 150, 'linx'); break;
            case 7: this.player = game.add.sprite(50, 150, 'mark'); break;
            case 8: this.player = game.add.sprite(50, 150, 'nunu'); break;
            case 9: this.player = game.add.sprite(50, 150, 'pangtt'); break;
            case 10: this.player = game.add.sprite(50, 150, 'sidh'); break;
            case 11: this.player = game.add.sprite(50, 150, 'timothy'); break;
            case 12: this.player = game.add.sprite(50, 150, 'wusz'); break;
            case 13: this.player = game.add.sprite(50, 150, 'wuyh'); break;
            case 14: this.player = game.add.sprite(50, 150, 'zhangk'); break;
            case 15: this.player = game.add.sprite(50, 150, 'ibo'); break;
        }
        this.player.animations.add('fly');
        this.player.animations.play('fly', 12, true);
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 0;
        this.player.body.setSize(30, 30, this.player.centerX - 15, this.player.centerY - 15);
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.immovable = true;
        this.nfls = game.add.sprite(game.world.centerX - 50, 350, 'nfls');

        this.soundFly = game.add.sound('fly_sound');
        this.soundScore = game.add.sound('score_sound');
        this.soundHitPipe = game.add.sound('hit_pipe_sound');
        this.soundHitGround = game.add.sound('hit_ground_sound')
        this.scoreLabel = game.add.bitmapText(game.world.centerX - 145, 5, 'flappy_font', 'Predicted Score', 36)
        this.scoreText = game.add.bitmapText(game.world.centerX - 20, 50, 'flappy_font', '0', 36);
        this.dialogText = game.add.bitmapText(game.world.centerX - 120, 150, 'flappy_font', '', 25);
        this.dialogBubble = game.add.bitmapText(game.world.centerX - 60, 280, 'flappy_font', '', 30);

        this.readyText = game.add.image(game.width / 2, 40, 'ready_text');
        this.playTip = game.add.image(game.width / 2, 300, 'play_tip');
        this.readyText.anchor.setTo(0.5, 0);
        this.playTip.anchor.setTo(0.5, 0);

        this.hasStarted = false;
        game.time.events.loop(1200, this.generatePipes, this);
        game.time.events.stop(false);
        game.input.onDown.addOnce(this.startGame, this);
    };

    this.update = function () {
        if (!this.hasStarted) return;
        if (!this.player.inWorld) this.gameOver();
        game.physics.arcade.collide(this.player, this.ground, this.hitGround, null, this);
        game.physics.arcade.overlap(this.player, this.pipeGroup, this.hitPipe, null, this);
        if (this.player.angle < 90) this.player.angle += 2.5;
        this.pipeGroup.forEachExists(this.checkScore, this);
    }

    this.startGame = function () {
        this.gameSpeed = 200;
        this.gameIsOver = false;
        this.hasHitGround = false;
        this.hasStarted = true;
        this.score = 0;
        this.bg.autoScroll(-(this.gameSpeed / 10), 0);
        this.ground.autoScroll(-this.gameSpeed, 0);
        this.player.body.gravity.y = 1150;
        this.readyText.destroy();
        this.playTip.destroy();
        this.dialogText.text = '';
        game.input.onDown.add(this.fly, this);
        game.time.events.start();
    }

    this.stopGame = function () {
        this.bg.stopScroll();
        this.ground.stopScroll();
        this.pipeGroup.forEachExists(function (pipe) {
            pipe.body.velocity.x = 0;
        }, this);
        this.player.animations.stop('fly', true);
        game.input.onDown.remove(this.fly, this);
        game.time.events.stop(true);
    }

    this.fly = function () {
        this.player.body.velocity.y = -350;
        game.add.tween(this.player).to({angle: -30}, 100, null, true, 0, 0, false);
        this.soundFly.play();
    }

    this.hitPipe = function () {
        if (this.gameIsOver) return;
        this.soundHitPipe.play();
        this.gameOver();
    }

    this.hitGround = function () {
        if (this.hasHitGround) return;
        this.hasHitGround = true;
        this.soundHitGround.play();
        this.gameOver(true);
    }

    this.gameOver = function (show_text) {
        this.gameIsOver = true;
        this.stopGame();
        if (show_text) this.showGameOverText();
    };

    this.showGameOverText = function () {
        this.scoreText.destroy();
        game.bestScore = game.bestScore || 0;
        if (this.score > game.bestScore) game.bestScore = this.score;
        this.gameOverGroup = game.add.group();
        var gameOverText = this.gameOverGroup.create(game.width / 2, 0, 'game_over');
        var scoreboard = this.gameOverGroup.create(game.width / 2, 70, 'score_board');
        var ibo = game.add.image(game.width / 2 - 82, 118, 'ibo', this.frame, this.gameOverGroup);
        var currentScoreText = game.add.bitmapText(game.width / 2 + 60, 105, 'flappy_font', this.score + '', 20, this.gameOverGroup);
        var bestScoreText = game.add.bitmapText(game.width / 2 + 60, 153, 'flappy_font', game.bestScore + '', 20, this.gameOverGroup);
        var dialogText = game.add.bitmapText(game.width / 2 - 100, 120, 'flappy_font', this.dialogText.text, 20, this.gameOverGroup);
        var replayBtn = game.add.button(game.width / 2, 210, 'btn', function () {
            game.state.start('play');
        }, this, null, null, null, null, this.gameOverGroup);
        gameOverText.anchor.setTo(0.5, 0);
        scoreboard.anchor.setTo(0.5, 0);
        replayBtn.anchor.setTo(0.5, 0);
        this.gameOverGroup.y = 30;
    }

    this.generatePipes = function (gap) {
        gap = gap || 100;
        var position = (505 - 320 - gap) + Math.floor((505 - 112 - 30 - gap - 505 + 320 + gap) * Math.random());
        var topPipeY = position - 360;
        var bottomPipeY = position + gap;

        if (this.resetPipe(topPipeY, bottomPipeY)) return;

        var topPipe = game.add.sprite(game.width, topPipeY, 'mathbooks', 0, this.pipeGroup);
        var bottomPipe = game.add.sprite(game.width, bottomPipeY, 'mathbooks', 1, this.pipeGroup);
        this.pipeGroup.setAll('checkWorldBounds', true);
        this.pipeGroup.setAll('outOfBoundsKill', true);
        this.pipeGroup.setAll('body.velocity.x', -this.gameSpeed);
    }

    this.resetPipe = function (topPipeY, bottomPipeY) {
        var i = 0;
        this.pipeGroup.forEachDead(function (pipe) {
            if (pipe.y <= 0) {
                pipe.reset(game.width, topPipeY);
                pipe.hasScored = false;
            } else {
                pipe.reset(game.width, bottomPipeY);
            }
            pipe.body.velocity.x = -this.gameSpeed;
            i++;
        }, this);
        return i == 2;
    }

    this.checkScore = function (pipe) {
        if (!pipe.hasScored && pipe.y <= 0 && pipe.x <= this.player.x - 17 - 54) {
            pipe.hasScored = true;
            this.scoreText.text = ++ this.score;
            this.soundScore.play();
            if (this.score == 1) this.dialogText.text = 'Pass EE';
            if (this.score == 2) this.dialogText.text = 'Pass CAS';
            if (this.score == 3) this.dialogText.text = 'Pass TOK';
            if (this.score == 7) this.dialogText.text = 'Pass 1 Subject';
            if (this.score == 10) this.dialogText.text = 'Full 1 Subject';
            if (this.score == 14) this.dialogText.text = 'Pass 2 Subject';
            if (this.score == 17) this.dialogText.text = 'Full 2 Subject';
            if (this.score == 21) this.dialogText.text = 'Pass 3 Subject';
            if (this.score == 24) this.dialogText.text = 'Full 3 Subject';
            if (this.score == 28) this.dialogText.text = 'Pass 4 Subject';
            if (this.score == 31) this.dialogText.text = 'Full 4 Subject';
            if (this.score == 35) this.dialogText.text = 'Pass 5 Subject';
            if (this.score == 38) this.dialogText.text = 'Full 5 Subject';
            if (this.score == 42) this.dialogText.text = 'Pass 6 Subject';
            if (this.score == 45) this.dialogText.text = 'Full 6 Subject';
            if (this.score > 45) this.dialogText.text = 'Finish IB';
            this.dialogBubble.text = '';
            switch (getRandomNumber(1, 15)) {
                case 1: this.dialogBubble.text = 'Social Social'; break;
                case 2: this.dialogBubble.text = 'Yaha'; break;
                case 3: this.dialogBubble.text = 'Flap Flap'; break;
                case 4: this.dialogBubble.text = 'Math is Awful'; break;
                case 5: this.dialogBubble.text = 'No HL Math'; break;
                case 6: this.dialogBubble.text = 'HeHe'; break;
                case 7: this.dialogBubble.text = 'So easy'; break;
                default: this.dialogBubble.text = ''; break;
            }
            return true;
        }
        return false;
    }
}

function getRandomNumber(min, max) {
    var range = max - min;
    var rand = Math.random();
    return (min + Math.round(rand * range));
}

game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
game.state.add('menu', game.States.menu);
game.state.add('play', game.States.play);
game.state.start('boot');

