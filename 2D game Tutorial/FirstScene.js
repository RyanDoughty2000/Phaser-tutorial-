class FirstScene extends Phaser.Scene {
    player;
    cursors;
    platforms;
    stars;
    scoreText; // reference to score text
    score = 0; /// initial score text value
    gameOver = false     // this is a boolean
    constructor(config) {
        super(config);
    }
    preload() {
        // load single image assets
        this.load.image('hills', 'assets/hills.jpg');
        this.load.image('ground-1600', 'assets/platform-1600.png');
        this.load.image('ground-100', 'assets/platform-100.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
         // load spritesheet asset
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        create() {
            ///setting the camera up
            this.cameras.main.setBounds(0, 0, 1600, 600);
            this.physics.world.setBounds(0, 0, 1600, 600);
            /// setting sprites and images up
            this.add.image(800, 300, 'hills');
            this.player = this.physics.add.sprite(800, 450, 'dude')
            this.player.jumpCount = 0;
            this.player.setCollideWorldBounds(true);
            this.player.setBounce(0.2) 
            // Hitbox
            this.player.setSize(28, 40).setOffset(1, 8);
            /// Moving the camera
            this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
            this.cursors = this.input.keyboard.createCursorKeys();
            this.platforms = this.physics.add.staticGroup();
            this.physics.add.collider(this.player, this.platforms)
            this.platforms.create(800, 586, 'ground-1600')
            this.platforms.create(180, 484, 'ground-100');
            this.platforms.create(450, 484, 'ground-100');
            this.platforms.create(250, 354, 'ground-100');
            this.platforms.create(650, 354, 'ground-100');
            this.platforms.create(350, 284, 'ground-100');
            this.bombs = this.physics.add.group();
            this.physics.add.collider(this.bombs, this.platforms);
            this.physics.add.overlap(this.player, this.bombs, this.endGame, null, this);
            this.stars = this.physics.add.group({
                key: 'star',
                repeat: 31,
                setXY: {
                    x: 25,
                    y: 0,
                    stepX: 50
                }
            });
            this.stars.children.iterate(
                function (child) {
                    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
                }
            );
            this.physics.add.collider(this.stars, this.platforms);
            this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
            this.scoreText = this.add.text(16, 16, 'score: 0', {
                fontSize: '32px',
                fill: '#000'
            }).setScrollFactor(0);
                