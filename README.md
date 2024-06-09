# Projeto de Testes de Performance com k6

[![Load API Test with K6](https://github.com/pricaimiTech/performanceTestK6/actions/workflows/load-test.yml/badge.svg)](https://github.com/pricaimiTech/performanceTestK6/actions/workflows/load-test.yml)
[![Average-load with K6](https://github.com/pricaimiTech/performanceTestK6/actions/workflows/averageLoad-scenario-test.yml/badge.svg)](https://github.com/pricaimiTech/performanceTestK6/actions/workflows/averageLoad-scenario-test.yml)
[![Breakpoint with K6](https://github.com/pricaimiTech/performanceTestK6/actions/workflows/breakpoint-test.yml/badge.svg)](https://github.com/pricaimiTech/performanceTestK6/actions/workflows/breakpoint-test.yml)

Este projeto contém scripts para realizar testes de performance e carga utilizando o k6 em APIs e aplicações web.

## Configuração de ambiente

- Configurando K6 [Link para Documentação](https://grafana.com/docs/k6/latest/set-up/install-k6/)

## Estrutura do Projeto

- `api-tests/` - Scripts de teste para APIs
- `e2e/` - Teste Web e API
- `web-tests/` - Scripts de teste para aplicações web
- `results/` - Resultados dos testes
- `README.md` - Documentação do projeto
  - `html-report` - reports html
  - `jsonOutput`- resultados dos testes exportados em formato json
  - `screenshots` - prints tirados durante os testes web

## Executando os Testes

Para executar os testes, utilize os seguintes comandos no terminal:

Para rodar os testes unitáriamente utilizar o comando

```
k6 run __test__/api-test/load-test.js
```

Caso deseje rodar todos os testes com um único comando, basta rodar o arquivo shell pelo bash

```
bash __test__/tdcTest.sh
```

ou 

```
yarn tdc
```

### Análise de Resultados

Os resultados dos testes serão salvos na pasta results. Você pode especificar o formato de saída utilizando a opção --out do k6. Por exemplo, para salvar o resultado em formato JSON:

```
k6 run --out json=report/jsonOutput/load-test.json api-tests/load-test.js
```

### Conheça os tipos de teste

Acesse a documentação do [k6](https://grafana.com/docs/k6/latest/testing-guides/test-types/)
