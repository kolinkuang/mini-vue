const Vue = {
    createApp(config) {
        // 编译函数
        // 输入值为视图模板
        function compile(template) {
            // 对视图模板进行解析并生成渲染函数
            return (observed, dom) => {
                // 渲染过程
                let input = dom.querySelector('input');
                if (!input) {
                    console.log('create input');
                    input = document.createElement('input');
                    input.setAttribute('value', observed.message);
                    input.addEventListener('keyup', function () {
                        // 确定哪些输入项需要双向绑定
                        observed.message = this.value;
                    });
                    dom.appendChild(input);
                }

                let button = dom.querySelector('button');
                if (!button) {
                    // 确定哪些值需要根据数据模型渲染
                    console.log('create button');
                    button = document.createElement('button');
                    button.addEventListener('click', () => {
                        // 绑定模型事件
                        return config.methods.click.apply(observed);
                    });
                    dom.appendChild(button);
                }
                button.innerText = observed.message;
            };
        }

        // 生成渲染函数
        const render = compile(config.template);

        // 定义响应函数
        let effective;

        // 数据劫持
        const observed = new Proxy(config.data(), {
            set(target, key, value, receiver) {
                // 装饰器模式？
                const result = Reflect.set(target, key, value, receiver);
                // 触发函数响应
                effective();
                return result;
            }
        });

        return {
            // 初始化
            mount(container) {
                const dom = document.querySelector(container);
                // 设置响应动作为渲染视图
                effective = () => render(observed, dom);
                render(observed, dom);
            }
        };
    }
};

export default Vue;