# Projeto de Testes de Performance com k6

Este projeto contém scripts para realizar testes de performance e carga utilizando o k6 em APIs e aplicações web.

## Estrutura do Projeto

- `api-tests/` - Scripts de teste para APIs
  - `load-test.js` - Teste de carga para API
  - `performance-test.js` - Teste de performance para API
- `web-tests/` - Scripts de teste para aplicações web
  - `load-test.js` - Teste de carga para web
  - `performance-test.js` - Teste de performance para web
- `results/` - Resultados dos testes
- `README.md` - Documentação do projeto

## Executando os Testes

Para executar os testes, utilize os seguintes comandos no terminal:

API Load Test

```
k6 run api-tests/load-test.js
```

API Performance Test

```
k6 run api-tests/performance-test.js
```
Web Load Test
```
k6 run web-tests/load-test.js
```

Web Performance Test
```
k6 run web-tests/performance-test.js
```

### Análise de Resultados
Os resultados dos testes serão salvos na pasta results. Você pode especificar o formato de saída utilizando a opção --out do k6. Por exemplo, para salvar o resultado em formato JSON:

```
k6 run --out json=results/api-load-test-results.json api-tests/load-test.js
```

### Conheça os tipos de teste 

Acesse a documentação do [k6](https://grafana.com/docs/k6/latest/testing-guides/test-types/)