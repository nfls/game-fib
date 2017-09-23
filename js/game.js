var game = new Phaser.Game(320, 505, Phaser.AUTO, 'game');
game.States = {};

var username;
var teachers;
var playerBeforeName;
var playerBeforeScore;
var playerAfterName;
var playerAfterScore;
var teachersAppeared;
//var deviceUsername;
var isOnline = true;
var topNames = new Array();
var topScores = new Array();
var topRanks = new Array();

textStyle_0 = {
    font: "bold 30px cursive",
    fill: "",
    aligh: "center",
}

textStyle_1 = {
    font: "bold 15px cursive",
    fill: "#02f78e",
    align: "center"
}

textStyle_2 = {
    font: "bold 20px arial",
    fill: "#fff",
    align: "center"
}

textStyle_3 = {
    font: "bold 25px cursive",
    fill: "#ffff37",
    align: "center"
}

function initTeachers() {
    teachers = new Array();
    var dialog_0 = new Array('Your CAS', 'Come To See Me', 'Very Important', 'Pass or Not', 'It is up to You');
    var dialog_1 = new Array('Banana', 'I love Banana', 'Green', 'IPAD', 'Detention');
    var dialog_2 = new Array('Wow', 'Yeah', 'It was Very Nice');
    var dialog_3 = new Array('No HL Math', 'A Star Needed', 'Yes');
    var dialog_4 = new Array('Wow', 'I hate Math', 'Math is Awful', 'Hey Bro', 'No HL Math');
    var dialog_5 = new Array('Yaha', 'Heihei', 'Math is Awful');
    var dialog_6 = new Array('Easy', 'Come on', 'Seriously');
    var dialog_7 = new Array('Mole merr', 'Be Careful', 'Enhennn');
    var dialog_8 = new Array('Very Good', 'Discuss', 'Very Different');
    var dialog_9 = new Array('Thousand Times', 'Art is Good', 'Yoohuuuu');
    var dialog_10 = new Array('Hulala', 'Use the Brain', 'Young Man', 'African Tea', 'Shame', 'Honey Tea', 'Wei', 'Motor Bike');
    var dialog_11 = new Array('Social Social', 'Real Leather', 'You guys');
    var dialog_12 = new Array('Heiheihei', 'Be Clever', 'Naive');
    var dialog_13 = new Array('Ethic Choice', 'Pass or Not', 'Ya', 'It is up to You');
    var dialog_14 = new Array('Illegal', 'Business', 'Organization');
    var dialog_15 = new Array('Chinese Soul', 'Global Vision', 'English', 'Be A NFLSer');

    var audios_0 = new Array('');
    var audios_1 = new Array('');
    var audios_2 = new Array('');
    var audios_3 = new Array('');
    var audios_4 = new Array('');
    var audios_5 = new Array('');
    var audios_6 = new Array('');
    var audios_7 = new Array('');
    var audios_8 = new Array('');
    var audios_9 = new Array('');
    var audios_10 = new Array('');
    var audios_11 = new Array('');
    var audios_12 = new Array('');
    var audios_13 = new Array('');
    var audios_14 = new Array('');
    var audios_15 = new Array('');

    var candymao = new teacher('Candy', 'candymao', 'englishbooks', dialog_0, audios_0);
    var erin = new teacher('Erin', 'erin', 'englishbooks', dialog_1, audios_1);
    var gavin = new teacher('Gavin', 'gavin', 'englishbooks', dialog_2, audios_2);
    var jones = new teacher('Jones', 'jones', 'mathbooks', dialog_3, audios_3);
    var leigh = new teacher('Leigh', 'leigh', 'mathbooks', dialog_4, audios_4);
    var linx = new teacher('LinX', 'linx', 'mathbooks', dialog_5, audios_5);
    var mark = new teacher('Mark', 'mark', 'mathbooks', dialog_6, audios_6);
    var nunu = new teacher('Nunu', 'nunu', 'physicsbooks', dialog_7, audios_7);
    var pangtt = new teacher('PangTT', 'pangtt', 'englishbooks', dialog_8, audios_8);
    var sidh = new teacher('Sidh', 'sidh', 'englishbooks', dialog_9, audios_9);
    var timothy = new teacher('Timothy', 'timothy', 'mathbooks', dialog_10, audios_10);
    var wusz = new teacher('WuSZ', 'wusz', 'physicsbooks', dialog_11, audios_11);
    var wuyh = new teacher('WuYH', 'wuyh', 'englishbooks', dialog_12, audios_12);
    var zhangk = new teacher('ZhangK', 'zhangk', 'mathbooks', dialog_13, audios_13);
    var ibo = new teacher('IBO', 'ibo', 'mathbooks', dialog_14, audios_14);
    var nflser = new teacher('NFLSer', 'nflser', 'englishbooks', dialog_15, audios_15);

    teachers[0] = candymao;
    teachers[1] = erin;
    teachers[2] = gavin;
    teachers[3] = jones;
    teachers[4] = leigh;
    //teachers[5] = linx;
    teachers[5] = leigh;
    teachers[6] = mark;
    teachers[7] = nunu;
    teachers[8] = pangtt;
    teachers[9] = sidh;
    teachers[10] = timothy;
    teachers[11] = wusz;
    teachers[12] = wuyh;
    teachers[13] = zhangk;
    teachers[14] = ibo;
    teachers[15] = nflser;
}

function teacher(name, image, book, dialogs, audios) {
    this.name = name;
    this.image = image;
    this.book = book;
    this.dialogs = dialogs;
    this.audios = audios;
}

function say(dialogs) {
    var a = getRandomNumber(0, 2 * (dialogs.length) - 1);
    if (a > dialogs.length - 1) {
        return '';
    } else {
        return dialogs[a];
    }
}

function checkString (string) {
    var Letters = '1234567890:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var i;
    var c;
    for(i = 0; i < string.length; i ++ )   {   //Letters.length() ->>>>取字符长度
        c = string.charAt(i);
        if (Letters.indexOf(c) == -1)   { //在"Letters"中找不到"c"   见下面的此函数的返回值
            return false;
        }
    }
    return true;
}

function loadUsername(){
    $.cookie("token",$.cookie("token"),{domain:"nfls.io",path:"/"});
    $.ajax({
        type: "GET",
        url: "https://api.nfls.io/center/username",
        dataType: "json",
        xhrFields:{
            withCredentials: true
        },
        success: function (message) {
            username = message.info; // 这个是用户名
        },
        error: function (message){
            if ((typeof userdeviceUsername) == "undefined"){
                jumpToLogin();
            } else{
                username = deviceUsername;
                isOnline = false;
            }
        }
    });
}

function jumpToLogin(){//转跳到登录界面
    $.cookie('token', '', {path: '/', domain: 'nfls.io', secure: true, expires: -1});
    window.location.href='https://center.nfls.io/operation/?reason=notlogin&redir=https%3a%2f%2fgame.nfls.io';
}

function pharseScore(message){
    $.each(message.info.names,function(index,item){
        topNames[index] = item;
    });
    $.each(message.info.scores,function(index,item){
        topScores[index] = item;
    });
    $.each(message.info.ranks,function(index,item){
        topRanks[index] = item;
    });
}

function getScore(){
    $.ajax({
        async: false,
        type: "GET",
        url: "https://api.nfls.io/center/rank",
        dataType: "json",
        xhrFields:{
            withCredentials: true
        },
        success: function (message) {
            pharseScore(message);
        },
        error: function (message){
            //正常情况不会有这个
        }
    });
}


function newPhaseScore(message){ // 新方法
    bestScore = message.info.bestScore;
    bestRank = message.info.bestRank;
    currentRank = message.info.nowRank;
    if(!IsEmpty(message.info.playerBefore)){
        playerBeforeName = message.info.playerBefore.username;
        playerBeforeScore = message.info.playerBefore.score;
    }
    if(!IsEmpty(message.info.playerAfter)){
        playerAfterName = message.info.playerAfter.username;
        playerAfterScore = message.info.playerAfter.score;
    }
}

function updateScore(nowScore){//参数是新的分数，只有在新的分数比旧分数高的时候才会更新，输入0强制更新
    $.ajax({
        //async: false,
        type: "POST",
        url: "https://api.nfls.io/center/rank",
        dataType: "json",
        data: {
            score:nowScore
        },
        xhrFields:{
            withCredentials: true
        },
        success: function (message) {
            newPhaseScore(message);
        },
        error: function (message){
            //正常情况不会有这个
        }
    });
}

function IsEmpty(v){
    switch (typeof v){
        case 'undefined' : return true; break;
        case 'string' : if($.trim(v).length == 0) return true; break;
        case 'boolean' : if(!v) return true; break;
        case 'number' : if(0 === v) return true; break;
        case 'object' :
            if(null === v) return true;
            if(undefined !== v.length && v.length==0) return true;
            for(var k in v){return false;} return true;
            break;
    }
    return false;
}

game.States.boot = function () {
    loadUsername();
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
        var preloadSprite = game.add.sprite(50, game.height / 2, 'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('background', 'assets/background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('title', 'assets/title.png');
        game.load.image('btn', 'assets/start-button.png');
        game.load.image('ready_text', 'assets/get-ready.png');
        game.load.image('play_tip', 'assets/instruction.png');
        game.load.image('game_over', 'assets/gameover.png');
        game.load.image('score_board', 'assets/scoreboard.png');
        game.load.image('blank_board', 'assets/blankboard.png');
        game.load.image('nfls', 'assets/nfls.png');

        game.load.bitmapFont('flappy_font', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

	    game.load.audio('bgm', 'assets/audios/bgm.mp3');
        game.load.audio('fly_sound', 'assets/audios/flap.wav');
        game.load.audio('score_sound', 'assets/audios/score.wav');
        game.load.audio('hit_pipe_sound', 'assets/audios/pipe-hit.wav');
        game.load.audio('hit_ground_sound', 'assets/audios/ouch.wav');

        game.load.image('englishbooks', 'assets/englishbooks.png');
        game.load.image('physicsbooks', 'assets/physicsbooks.png');
        game.load.image('mathbooks', 'assets/mathbooks.png');

        game.load.image('candymao', 'assets/players/_CandyMao.png');
        game.load.image('erin', 'assets/players/_Erin.png');
        game.load.image('gavin', 'assets/players/_Gavin.png');
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
        game.load.image('nflser', 'assets/players/_NFLS.png');

        this.bgm = game.add.audio('bgm');
        this.bgm.loop = true;
        this.bgm.play();

        initTeachers();
        teachersAppeared = new Array();
        for (var i = 0; i < teachers.length; i ++) {
            teachersAppeared[i] = false;
        }

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
        titleGroup.x = 40;
        titleGroup.y = 330;
        game.add.tween(titleGroup).to({y: 370}, 1000, null, true, 0, Number.MAX_VALUE, true);
        var btn = game.add.button(game.width / 2, game.height - 50, 'btn', function () {
            game.state.start('play');
        });
        btn.anchor.setTo(0.5, 0.5);

        if (isOnline) {
            getScore();

            var rankGroup = game.add.group();

            for (var i = 0; i < topNames.length; i ++) {
                if (topNames[i] == username) {
                    game.add.text(game.world.centerX - 160, 10 + i * 30, 'Rank ' + topRanks[i] + ' : ' + topNames[i], textStyle_3, rankGroup);
                    game.add.text(game.world.centerX + 100, 10 + i * 30, topScores[i] + '', textStyle_3, rankGroup);
                } else {
                    if (checkString(topNames[i])) {
                        game.add.bitmapText(game.world.centerX - 150, 20 + i * 30, 'flappy_font', 'Rank ' + topRanks[i] + ' : ' + topNames[i], 20, rankGroup);
                    } else {
                        game.add.text(game.world.centerX - 150, 20 + i * 30, 'Rank ' + topRanks[i] + ' : ' + topNames[i], textStyle_2, rankGroup);
                    }
                    game.add.bitmapText(game.world.centerX + 100, 20 + i * 30, 'flappy_font', topScores[i] + '', 20, rankGroup);
                }
            }
        } else {
            game.add.bitmapText(game.world.centerX - 100, game.world.centerY - 50, 'flappy_font', 'Offline Mode', 30);
        }
    }
}

game.States.play = function () {
    this.create = function () {

        var count = 0;

        for (var i = 0; i < teachersAppeared.length; i ++) {
            if (teachersAppeared[i]) {
                count += 1;
            }
        }

        if (count > teachersAppeared.length / 2) {
            for (var i = 0; i < teachersAppeared.length; i ++) {
                teachersAppeared[i] = false;
            }
        }

        currentRank = 'null';
        bestRank = 'null';
        bestScore = 'null';
        playerBeforeName = '';
        playerBeforeScore = '';
        playerAfterName = '';
        playerAfterScore = '';

        this.bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        this.pipeGroup = game.add.group();
        this.pipeGroup.enableBody = true;
        this.ground = game.add.tileSprite(0, game.height - 112, game.width, 112, 'ground');
        do {
            this.playerType = getRandomNumber(0, 14);
        } while (teachersAppeared[this.playerType]);
        teachersAppeared[this.playerType] = true;
        this.player = game.add.sprite(50, 150, teachers[this.playerType].image);
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
        this.currentScoreLabel = game.add.bitmapText(game.world.centerX - 145, 5, 'flappy_font', 'Predicted Score', 36)
        this.currentScoreText = game.add.bitmapText(game.world.centerX - 20, 50, 'flappy_font', '0', 36);
        this.bestScoreLabel = game.add.bitmapText(game.world.centerX + 50, 420, 'flappy_font', 'Best Score', 18);
        this.bestScoreText = game.add.bitmapText(game.world.centerX + 50, 440, 'flappy_font', 'null', 20);
        this.dialogText = game.add.bitmapText(game.world.centerX - 50, 300, 'flappy_font', '', 25);
        this.dialogBubble = game.add.bitmapText(this.player.position.x + 20, this.player.position.y, 'flappy_font', '', 30);
        //this.currentRankLabel = game.add.bitmapText(game.world.centerX - 150, 420, 'flappy_font', 'Current Rank', 18);
        //this.currentRankText = game.add.bitmapText(game.world.centerX - 150, 440, 'flappy_font', 'null', 20);
        this.currentRankLabel = game.add.bitmapText(game.world.centerX + 30, 150, 'flappy_font', 'Current Rank', 18);
        this.currentRankText = game.add.bitmapText(game.world.centerX + 30, 170, 'flappy_font', 'null', 20);
        //this.bestRankLabel = game.add.bitmapText(game.world.centerX - 150, 460, 'flappy_font', 'Best Rank', 18);
        //this.bestRankText = game.add.bitmapText(game.world.centerX - 150, 480, 'flappy_font', 'null', 20);
        this.bestRankLabel = game.add.bitmapText(game.world.centerX + 30, 210, 'flappy_font', 'Best Rank', 18);
        this.bestRankText = game.add.bitmapText(game.world.centerX + 30, 230, 'flappy_font', 'null', 20);
        //this.usernameLabel = game.add.text(game.world.centerX - 50, 480, username, textStyle_2);
        //this.usernameLabel = game.add.text(game.world.centerX - 150, 440, username, textStyle_2);
        this.usernameLabel;
        if (checkString(username)) {
            this.usernameLabel = game.add.bitmapText(game.width / 2 - 150, 480, 'flappy_font', username, 20);
        } else {
            this.usernameLabel = game.add.text(game.width / 2 - 150, 480, username, textStyle_2);
        }

        //updateScore(0);
        var self = this;
        $.ajax({
            //async: false,
            type: "POST",
            content: this,
            url: "https://api.nfls.io/center/rank",
            dataType: "json",
            data: {
                score: 0
            },
            xhrFields:{
                withCredentials: true
            },
            success: function(message){
                if(!IsEmpty(message.info.playerBefore)){
                    playerBeforeName = message.info.playerBefore.username;
                    playerBeforeScore = message.info.playerBefore.score;
                }
                if(!IsEmpty(message.info.playerAfter)){
                    playerAfterName = message.info.playerAfter.username;
                    playerAfterScore = message.info.playerAfter.score;
                }
                self.currentRankText.text = message.info.nowRank;
                self.bestRankText.text = message.info.bestRank;
                self.bestScoreText.text = message.info.bestScore;
            }
        });

        game.add.text(game.world.centerX + 70, 460, '@GuardHei', textStyle_1);
        game.add.text(game.world.centerX + 70, 480, '@mmlmml1', textStyle_1);

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
        this.dialogBubble.position.y = this.player.position.y;
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
        var self = this;
        this.playerBeforeName = '';
        this.playerBeforeScore = '';
        this.playerAfterName = '';
        this.playerAfterScore = '';
        this.currentScoreText.destroy();
        this.dialogBubble.destroy();
        game.bestScore = game.bestScore || 0;
        if (this.score > game.bestScore) game.bestScore = this.score;
        this.gameOverGroup = game.add.group();
        var gameOverText = this.gameOverGroup.create(game.width / 2, 0, 'game_over');
        var scoreboard = this.gameOverGroup.create(game.width / 2, 70, 'score_board');
        var blankboard = this.gameOverGroup.create(game.width / 2, 195, 'blank_board');
        var icon = game.add.image(game.width / 2 - 82, 115, teachers[this.playerType].image, this.frame, this.gameOverGroup);
        var playerText = game.add.bitmapText(game.width / 2 - 30, 110, 'flappy_font', teachers[this.playerType].name, 20, this.gameOverGroup);
        var currentScoreText = game.add.bitmapText(game.width / 2 + 60, 105, 'flappy_font', this.score + '', 20, this.gameOverGroup);
        var bestScoreText = game.add.bitmapText(game.width / 2 + 60, 153, 'flappy_font', this.bestScoreText.text + '', 20, this.gameOverGroup);
        var dialogText = game.add.bitmapText(game.width / 2 - 100, 160, 'flappy_font', this.dialogText.text, 20, this.gameOverGroup);
        var playerBeforeText = game.add.bitmapText(game.width / 2 - 100, 225, 'flappy_font', this.playerBeforeScore + '', 20, this.gameOverGroup);
        var playerAfterText = game.add.bitmapText(game.width / 2 - 100, 275, 'flappy_font', this.playerAfterScore + '', 20, this.gameOverGroup);

        if (isOnline) {
            if (playerBeforeName != '') {
                if (checkString(playerBeforeName)) {
                    var playerBeforeLabel = game.add.bitmapText(game.width / 2 - 100, 200, 'flappy_font', playerBeforeName + ' : Before', 20, this.gameOverGroup);
                } else {
                    var playerBeforeLabel = game.add.text(game.width / 2 - 100, 200, playerBeforeName + ':Before', textStyle_2, this.gameOverGroup);
                }
                playerBeforeText.text = playerBeforeScore;
            } else {
                var playerBeforeLabel = game.add.bitmapText(game.width / 2 - 100, 200, 'flappy_font', 'No One is Ahead', 20, this.gameOverGroup);
                playerBeforeText.text = '';
            }

            if (playerAfterName != '') {
                if (checkString(playerAfterName)) {
                    var playerAfterLabel = game.add.bitmapText(game.width / 2 - 100, 250, 'flappy_font', playerAfterName + ' : After', 20, this.gameOverGroup);
                } else {
                    var playerAfterLabel = game.add.text(game.width / 2 - 100, 250, playerAfterName + ':After', textStyle_2, this.gameOverGroup);
                }
                playerAfterText.text = playerAfterScore;
            } else {
                var playerAfterLabel = game.add.bitmapText(game.width / 2 - 100, 200, 'flappy_font', 'No One is Behind', 20, this.gameOverGroup);
                playerAfterText.text = '';
            }

            var playerBestRankLabel = game.add.bitmapText(game.width / 2 - 150, 320, 'flappy_font', 'Rank', 40, this.gameOverGroup);
            var playerBestRankText = game.add.bitmapText(game.width / 2 + 80, 320, 'flappy_font', this.bestRankText.text, 50, this.gameOverGroup);
        } else {
            var offlineLabel = game.add.bitmapText(game.world.width / 2 - 100, 200, 'flappy_font', 'Offline Mode', 30, this.gameOverGroup);
        }

        var replayBtn = game.add.button(game.width / 2, game.height - 180, 'btn', function () {
            game.state.start('play');
        }, this, null, null, null, null, this.gameOverGroup);
        gameOverText.anchor.setTo(0.5, 0);
        scoreboard.anchor.setTo(0.5, 0);
        blankboard.anchor.setTo(0.5, 0);

        replayBtn.anchor.setTo(0.5, 0);
        this.gameOverGroup.y = 30;
    }

    this.generatePipes = function (gap) {
        gap = gap || 100;
        var position = (505 - 320 - gap) + Math.floor((505 - 112 - 30 - gap - 505 + 320 + gap) * Math.random());
        var topPipeY = position - 360;
        var bottomPipeY = position + gap;

        if (this.resetPipe(topPipeY, bottomPipeY)) return;

        var topPipe = game.add.sprite(game.width, topPipeY, teachers[this.playerType].book, 0, this.pipeGroup);
        var bottomPipe = game.add.sprite(game.width, bottomPipeY, teachers[this.playerType].book, 1, this.pipeGroup);
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

    this.updateText = function() {
        this.currentRankText.text = currentRank;
        this.bestRankText.text = bestRank;
        this.bestScoreText.text = bestScore;
    }

    this.checkScore = function (pipe) {
        if (!pipe.hasScored && pipe.y <= 0 && pipe.x <= this.player.x - 17 - 54) {
            pipe.hasScored = true;
            this.currentScoreText.text = ++this.score;
            //updateScore(this.score);
            var self = this;
            $.ajax({
                //async: false,
                type: "POST",
                content: this,
                url: "https://api.nfls.io/center/rank",
                dataType: "json",
                data: {
                    score:this.score
                },
                xhrFields:{
                    withCredentials: true
                },
                success: function(message){
                    if(!IsEmpty(message.info.playerBefore)){
                        playerBeforeName = message.info.playerBefore.username;
                        playerBeforeScore = message.info.playerBefore.score;
                    }
                    if(!IsEmpty(message.info.playerAfter)){
                        playerAfterName = message.info.playerAfter.username;
                        playerAfterScore = message.info.playerAfter.score;
                    }
                    self.currentRankText.text = message.info.nowRank;
                    self.bestRankText.text = message.info.bestRank;
                    self.bestScoreText.text = message.info.bestScore;
                }
            });
            this.soundScore.play();
            if (this.score == 1) this.dialogText.text = 'Pass EE';
            if (this.score == 2) this.dialogText.text = 'Pass CAS';
            if (this.score == 3) this.dialogText.text = 'Pass TOK';
            if (this.score == 7) this.dialogText.text = 'Pass 1 Subject';
            if (this.score == 10) this.dialogText.text = 'Full 1 Subject';
            if (this.score == 14) this.dialogText.text = 'Pass 2 Subjects';
            if (this.score == 17) this.dialogText.text = 'Full 2 Subjects';
            if (this.score == 21) this.dialogText.text = 'Pass 3 Subjects';
            if (this.score == 24) this.dialogText.text = 'Full 3 Subjects';
            if (this.score == 28) this.dialogText.text = 'Pass 4 Subjects';
            if (this.score == 31) this.dialogText.text = 'Full 4 Subjects';
            if (this.score == 35) this.dialogText.text = 'Pass 5 Subjects';
            if (this.score == 38) this.dialogText.text = 'Full 5 Subjects';
            if (this.score == 42) this.dialogText.text = 'Pass 6 Subjects';
            if (this.score == 45) this.dialogText.text = 'Full 6 Subjects';
            if (this.score > 45) this.dialogText.text = 'Finish IB';
            this.dialogBubble.text = say(teachers[this.playerType].dialogs);
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