// 定义游戏界面和对象
const gameContainer = document.getElementById('game-container');
const player1 = document.getElementById('player1');
const player1Health = document.getElementById('player1-health');
const player2 = document.getElementById('player2');
const player2Health = document.getElementById('player2-health');
const player1Bullet = document.getElementById('player1-bullet');
const player2Bullet = document.getElementById('player2-bullet');

// 定义常量
const PLAYER_SPEED = 5;
const BULLET_SPEED = 10;
const BULLET_DAMAGE = 1 / 3;

// 定义变量
let player1HealthValue = 1;
let player2HealthValue = 1;
let player1Direction = '';
let player2Direction = '';

// 定义按键事件
document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37: // left arrow
      player1Direction = 'left';
      break;
    case 38: // up arrow
      player1Direction = 'up';
      break;
    case 39: // right arrow
      player1Direction = 'right';
      break;
    case 40: // down arrow
      player1Direction = 'down';
      break;
    case 70: // f key
      fireBullet(player1, player1Bullet, player2, player2Health);
      break;
  }
});

// 定义更新函数
function update() {
  // 更新玩家1的位置和血条
  let newPlayer1Left = player1.offsetLeft;
  let newPlayer1Top = player1.offsetTop;
  switch (player1Direction) {
    case 'left':
      newPlayer1Left -= PLAYER_SPEED;
      break;
    case 'up':
      newPlayer1Top -= PLAYER_SPEED;
      break;
    case 'right':
      newPlayer1Left += PLAYER_SPEED;
      break;
    case 'down':
      newPlayer1Top += PLAYER_SPEED;
      break;
  }
  if (newPlayer1Left < 0) {
    newPlayer1Left = 0;
  } else if (newPlayer1Left + player1.offsetWidth > gameContainer.offsetWidth) {
    newPlayer1Left = gameContainer.offsetWidth - player1.offsetWidth;
  }
  if (newPlayer1Top < 0) {
    newPlayer1Top = 0;
  } else if (newPlayer1Top + player1.offsetHeight > gameContainer.offsetHeight) {
    newPlayer1Top = gameContainer.offsetHeight - player1.offsetHeight;
  }
  player1.style.left = newPlayer1Left + 'px';
  player1.style.top = newPlayer1Top + 'px';
  player1Health.style.width = player1HealthValue * 50 + 'px';

  // 更新玩家2的位置和血条
  let newPlayer2Left = player2.offsetLeft;
  let newPlayer2Top = player2.offsetTop;
  switch (player2Direction) {
    case 'left':
      newPlayer2Left -= PLAYER_SPEED;
      break;
    case 'up':
      newPlayer2Top -= PLAYER_SPEED;
      break;
    case 'right':
      newPlayer2Left += PLAYER_SPEED;
      break;
    case 'down':
      newPlayer2Top += PLAYER_SPEED;
      break;
  }
  if (newPlayer2Left < 0) {
    newPlayer2Left = 0;
  } else if (newPlayer2Left + player2.offsetWidth > gameContainer.offsetWidth) {
    newPlayer2Left = gameContainer.offsetWidth - player2.offsetWidth;
  }
  if (newPlayer2Top < 0) {
    newPlayer2Top = 0;
  } else if (newPlayer2Top + player2.offsetHeight > gameContainer.offsetHeight) {
    newPlayer2Top = gameContainer.offsetHeight - player2.offsetHeight;
  }
  player2.style.left = newPlayer2Left + 'px';
  player2.style.top = newPlayer2Top + 'px';
  player2Health.style.width = player2HealthValue * 50 + 'px';
  // 更新玩家1子弹的位置和碰撞检测
  let newPlayer1BulletTop = player1Bullet.offsetTop - BULLET_SPEED;
  if (newPlayer1BulletTop + player1Bullet.offsetHeight < 0) {
    player1Bullet.style.display = 'none';
  } else {
    player1Bullet.style.top = newPlayer1BulletTop + 'px';
    checkBulletCollision(player1Bullet, player2, player2Health, true);
  }

  // 更新玩家2子弹的位置和碰撞检测
  let newPlayer2BulletTop = player2Bullet.offsetTop + BULLET_SPEED;
  if (newPlayer2BulletTop > gameContainer.offsetHeight) {
    player2Bullet.style.display = 'none';
  } else {
    player2Bullet.style.top = newPlayer2BulletTop + 'px';
    checkBulletCollision(player2Bullet, player1, player1Health, false);
  }
}

// 定义子弹发射函数
function fireBullet(player, bullet, target, targetHealth) {
  if (bullet.style.display !== 'none') {
    return;
  }
  let playerLeft = player.offsetLeft + player.offsetWidth / 2 - bullet.offsetWidth / 2;
  let playerTop = player.offsetTop - bullet.offsetHeight;
  bullet.style.left = playerLeft + 'px';
  bullet.style.top = playerTop + 'px';
  bullet.style.display = 'block';
}

// 定义碰撞检测函数
function checkBulletCollision(bullet, target, targetHealth, isPlayer1Bullet) {
  if (bullet.style.display === 'none') {
    return;
  }
  let bulletRect = bullet.getBoundingClientRect();
  let targetRect = target.getBoundingClientRect();
  if (bulletRect.right > targetRect.left && bulletRect.left < targetRect.right &&
    bulletRect.bottom > targetRect.top && bulletRect.top < targetRect.bottom) {
    bullet.style.display = 'none';
    let damage = BULLET_DAMAGE;
    if (isPlayer1Bullet) {
      player2HealthValue -= damage;
    } else {
      player1HealthValue -= damage;
    }
    if (player1HealthValue <= 0 || player2HealthValue <= 0) {
      endGame();
    }
  }
}

// 定义游戏结束函数
function endGame() {
  clearInterval(gameLoop);
  let message = '';
  if (player1HealthValue <= 0 && player2HealthValue <= 0) {
    message = '平局！';
  } else if (player1HealthValue <= 0) {
    message = '玩家2胜利！';
  } else {
    message = '玩家1胜利！';
  }
  alert(message);
}

// 启动游戏循环
let gameLoop = setInterval(update, 50);


