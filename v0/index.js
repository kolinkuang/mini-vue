const data = {
    message: 'Hello Vue 3!!'
};

function update() {
    // 更新视图
    document.querySelector('button').innerHTML = data.message;
    document.querySelector('input').value = data.message;
}

//首次数据渲染
update();

document.querySelector('button').addEventListener('click', () => {
    data.message = data.message.split('').reverse().join('');
    update();
});

document.querySelector('input').addEventListener('keyup', function () {
    data.message = this.value;
    update();
});