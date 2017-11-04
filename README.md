# dally
Easy to render your html file on server

## Installation
>npm i -g dally </br>

## How to use

- Enter your project path 

- Entry the following command. 

  It will render index.html under your current path on port 3000 by default
```
  dally   
```
- Done ! Dally your font-end project!


## Feature
- Specify html file to reder, for example, render example.html

  It will render example.html
```
  dally example 
```
  Or entry the url like this
```
  http://127.0.0.1:3000/example.html
```


- Specify server port

```
  dally --port 3001  ||  dally -p 3001
```

## More
```
  dally --help
```

## 使用方法

- 全局安装dally
> npm i -g dally

- 然后进入到前端项目的目录下，执行以下命令即可

  默认渲染index.html和监听3000端口，若端口已被占用则会自动监听别的端口
  > dally

  如果需要渲染指定的html，如example.html，则可以进行如下操作
  
  - 输入需要渲染的html名字:
  > dally example

  - 或直接在URL中输入对应的html：
  > http://127.0.0.1:3000/example.html