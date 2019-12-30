# Type A

Webアプリを「Webフロント」「DB API」「DBサーバ」の3つに分けて構築したのコンテナを `docker-compose.yml` を使ってコンテナ同士で接続をするサンプル。

- [図入りの資料（Google Slides）](https://docs.google.com/presentation/d/1DQcMMscqrhB2z4wgd68c1qCR39tUQcMNIb3fzHqi2T0/edit?folder=1NsOi9WuUxLppCC3T9ILRKv-z0VEYyGO0#slide=id.p)
- [コード：Type A（GitHub）](https://github.com/ryoyakawai/docker_kubernetes_example/tree/master/type_a)

## 起動

```bash
$ docker-compose up --build;
```


その後、ブラウザのアドレスバーに `http://localhost:8080` にアクセスするとこのアプリに接続できる。

**注)** Port: 8080 - 8082 が空いていることが起動する必須要件

## 停止とクリーニング（？）

```bash
$ docker-compose down;
```
