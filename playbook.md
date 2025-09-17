# 📖 Construye dApps en Starknet Rápidamente con Scaffold-Stark

---
title: Construye dApps en Starknet Rápidamente con Scaffold-Stark
instructor: Damian Piñones
prerequisites:
  - Conocimientos básicos de Cairo y desarrollo de contratos inteligentes en Starknet
  - Familiaridad con JavaScript/TypeScript y React/Next.js
  - Entendimiento de fundamentos de Starknet (ej. cuentas, transacciones)
tools_required:
  - Node.js (v18 LTS o superior)
  - Yarn (gestor de paquetes)
  - Scarb (v2.12.0) para compilación de Cairo
  - Starknet Foundry (v0.49.0) para pruebas
  - Starknet-Devnet (v0.5.1) para blockchain local
  - Editor como VS Code
  - Git para control de versiones
---

## 🎯 Objetivos de Aprendizaje

Al final de esta sesión, los participantes podrán:
- [ ] **Inicializar una dApp completa en Starknet**: Escalar un proyecto usando Scaffold-Stark, desplegar un contrato inteligente de muestra en DevNet y lanzar un frontend en React en menos de 10 minutos, verificando la funcionalidad a través de la UI de depuración.
- [ ] **Integrar contratos inteligentes con hooks de frontend**: Usar hooks type-safe de starknet-react para leer el estado del contrato y realizar transacciones de escritura simple/múltiple, asegurando interacciones de usuario fluidas sin gestión manual de ABIs.
- [ ] **Desplegar en testnet y optimizar UX**: Configurar para testnet Sepolia, manejar bundling de transacciones múltiples (ej. approve + transferencia en una sola firma) y solucionar problemas comunes de despliegue para dApps listas para producción.

**Entregables**:
- Una dApp funcional con un contrato inteligente "Greeting" desplegado, frontend que muestra y actualiza el estado, y una demo de transacción multi-escritura.
- Configuración local de DevNet con historial de transacciones visible en el explorador de bloques integrado.

## 💡 Introducción

### ¿Por qué es importante esto?
El tiempo es tu recurso más valioso. Hackathons como Resolve o la construcción de MVPs para inversores demandan desplegar dApps de alta calidad rápidamente, pero los setups tradicionales dispersan herramientas en bibliotecas: starknet.js para interacciones de bajo nivel, starknet-react para hooks, Scarb/Foundry para contratos, y Next.js para frontend. Esta fragmentación lleva a horas perdidas en boilerplate, depuración de ABIs desalineados o luchas con versiones de RPC.

Scaffold-Stark resuelve esto proporcionando un toolkit opinado y open-source que integra todo out-of-the-box. Inspirado en Scaffold-ETH, enfatiza la experiencia de desarrollador (DX) con características como recarga automática de contratos, wallets burner para pruebas instantáneas y hooks type-safe que minimizan errores. Para constructores de Starknet, esto significa enfocarse en un 70% en características innovadoras (ej. protocolos DeFi, NFTs) y 30% en infraestructura—alineado con demandas del mundo real donde la velocidad de despliegue correlaciona con éxito en financiamiento. A medida que crece la adopción de Starknet (post-actualizaciones 0.14 y RPC 0.9), dominar Scaffold-Stark te posiciona para construir apps imparables más rápido que la competencia.

### ¿Qué construiremos?
Crearemos una "dApp Greeting" simple pero extensible: un contrato inteligente en Cairo que almacena y actualiza un mensaje de saludo, con integración ERC20 para actualizaciones premium (requiriendo approve + transferencia). El frontend usará Next.js para leer el saludo actual, actualizarlo vía escrituras simples, y bundlear approve + actualización premium en una transacción. Al final de la sesión, desplegarás en DevNet/Sepolia, interactuarás vía UI personalizada y explorarás las herramientas de depuración—listo para forkear en tu proyecto de hackathon.

## ⚙️ Sección 1: Configuración del Proyecto y Despliegue de Contratos Inteligentes

### Concepto Clave
Scaffold-Stark agiliza la estructura monorepo para dApps en Starknet: contratos en `/packages/snfoundry` (usando Scarb/Foundry), frontend en `/packages/nextjs` (React/Next.js con Tailwind/DaisyUI). El escalador (`npx create-stark@latest`) maneja dependencias, Git init y setup de env. Comandos clave—`yarn chain` (DevNet local), `yarn deploy` (compilar/desplegar contratos), `yarn start` (frontend)—crean un bucle de retroalimentación. Los ABIs se copian automáticamente al frontend en despliegue, habilitando Contract Fast Reload para desarrollo iterativo. Esto abstrae RPC (compatible con 0.9.x) y configs de red, soportando forks de Mainnet/Sepolia para pruebas realistas.

### Herramientas Requeridas
- Node.js v18+ y Yarn: Para gestión de paquetes.
- Scarb v2.12.0: Herramienta de build para Cairo (instala vía `asdf install scarb 2.12.0` o https://docs.swmansion.com/scarb/download.html).
- Starknet Foundry v0.49.0: Para pruebas/despliegue (https://foundry-rs.github.io/starknet-foundry/getting-started/installation.html).
- Starknet-Devnet v0.5.1: Cadena local (instala vía Starkup: `curl --proto '=https' --tlsv1.2 -sSf https://sh.starkup.sh | sh`).
- Opcional: ASDF para versionado de herramientas; Dev Containers en VS Code para setup basado en Docker.

### Ejercicio Práctico: Escala y Despliega un Contrato de Muestra
**Objetivo**: Crear un nuevo proyecto Scaffold-Stark, iniciar DevNet, desplegar un "YourContract" modificable (almacenamiento de saludo), y verificar vía UI de depuración—logrando una dApp local funcional en <5 minutos.

**Pasos**:
1. Abre la terminal y ejecuta el escalador:  
   ```
   npx create-stark@latest
   ```
   - Elige nombre del proyecto (ej. `my-greeting-dapp`), instala dependencias (sí). Esto configura monorepo con contrato de muestra en `packages/snfoundry/contracts/src/your_contract.cairo`.

2. Navega e inicia cadena local:  
   ```
   cd my-greeting-dapp
   yarn chain
   ```
   - Esto lanza Starknet-Devnet (compatible con v0.14). Espera "Devnet is running" (puerto 5050).

3. Edita contrato de muestra (agrega función de reset para práctica): Abre `packages/snfoundry/contracts/src/your_contract.cairo` y agrega:  
   ```cairo
   fn set_greeting_to_default(ref self: ContractState) {
       self.greeting.write('Hello Scaffold-Stark!');
   }
   ```
   - Guarda. Esto extiende las funciones predeterminadas `set_greeting` y `get_greeting`.

4. Despliega contratos:  
   ```
   yarn deploy
   ```
   - Compila con Scarb, despliega en DevNet. La salida muestra dirección del contrato (ej. `0x...`). ABIs se copian auto a `packages/nextjs/abis`.

5. Lanza frontend y conecta:  
   ```
   yarn start
   ```
   - Abre http://localhost:3000. Conecta un wallet burner (precargado con 10k STRK). Navega a pestaña "Debug Contracts"—tu contrato aparece con funciones listadas.

**Resultado Esperado**: UI de depuración muestra `get_greeting` (retorna "Building unstoppable apps"), `set_greeting` (escritura con input), y nueva `set_greeting_to_default`. Llamar `set_greeting("Hello Resolve!")` actualiza estado; enlace al explorador muestra hash de tx.

### ⚠️ Solución de Problemas Comunes
- **Error**: "Scarb not found" o mismatch de versión.  
  **Solución**: Ejecuta `asdf install scarb 2.12.0 && asdf global scarb 2.12.0`. Reinicia terminal.
- **Error**: Despliegue falla con "Invalid RPC version".  
  **Solución**: Asegura que DevNet use RPC 0.9.x; chequea `.env` para `NEXT_PUBLIC_DEVNET_PROVIDER_URL=http://127.0.0.1:5050/rpc`.
- **Error**: Frontend no detecta cambios en contrato.  
  **Solución**: Redepliega (`yarn deploy`) y refresca navegador—Fast Reload adapta ABIs auto.

### 💡 Mejores Prácticas
- Usa ASDF o Dev Containers para bloquear versiones de herramientas, evitando problemas "funciona en mi máquina".
- Siempre fork de Mainnet/Sepolia para probar contratos externos: `yarn chain --fork-network https://starknet-mainnet.public.blastapi.io/rpc/v0_9`.
- Commitea temprano: Scaffold incluye Git; push a GitHub para colaboración.

## ⚙️ Sección 2: Integración de Frontend y Escrituras Multi-Transacción

### Concepto Clave
Las interacciones de frontend aprovechan hooks de starknet-react sobre starknet.js: `useScaffoldReadContract` para consultas (ej. leer estado), `useScaffoldWriteContract` para llamadas simples, y `useScaffoldMultiWriteContract` para bundling (ej. approve ERC20 + llamada en una firma, reduciendo fricción UX). Config en `scaffold.config.ts` maneja cadenas (DevNet → Sepolia). Componentes como `<Address />` y `<Balance />` proveen UI lista; type-safety atrapa errores temprano (ej. nombres de funciones inválidos). Para testnets, set PRIVATE_KEY en `.env` y faucet STRK.

### Herramientas Requeridas
- Next.js (incluido): Para app React con renderizado server-side.
- Wallet Argent X o Braavos: Para conexiones en testnet.
- Faucet: https://starknet-faucet.vercel.app/ para STRK en Sepolia.

### Ejercicio Práctico: Construye UI Personalizada con Hooks y Despliega en Sepolia
**Objetivo**: Agrega UI read/write para mostrar/actualizar saludo, implementa multi-write para premium (con approve ERC20), cambia a Sepolia, y despliega—demostrando flujo end-to-end de producción.

**Pasos**:
1. Configura para Sepolia: Edita `packages/nextjs/scaffold.config.ts`:  
   ```ts
   targetNetworks: [chains.sepolia],
   ```
   - Agrega a `packages/snfoundry/.env`: `PRIVATE_KEY=your_private_key` (genera vía Argent).  
   - En `packages/nextjs/.env`: `NEXT_PUBLIC_SEPOLIA_PROVIDER_URL=https://starknet-sepolia.public.blastapi.io/rpc/v0_9`.

2. Fondos en wallet: Obtén STRK del faucet, nota dirección de cuenta.

3. Agrega hook de lectura en `packages/nextjs/app/page.tsx` (agrega `'use client';` al inicio):  
   ```tsx
   import { useScaffoldReadContract } from '~~/hooks/scaffold-stark';
   const { data: greeting } = useScaffoldReadContract({
     contractName: 'YourContract',
     functionName: 'get_greeting',
   });
   // Render: <span className="text-xl">{Uint8Array.from(greeting?.result ?? []).toString()}</span>
   ```

4. Agrega botón de escritura simple:  
   ```tsx
   import { useScaffoldWriteContract } from '~~/hooks/scaffold-stark';
   const { writeAsync } = useScaffoldWriteContract();
   // Botón onClick: () => writeAsync({ contractName: 'YourContract', functionName: 'set_greeting', args: ['hello-resolve', { type: 'CairoOption', variant: { none: {} } }, 0n ] });
   ```

5. Implementa multi-write (premium: approve + set con 1 STRK):  
   ```tsx
   const { writeAsync: multiWrite } = useScaffoldMultiWriteContract();
   // Botón onClick: () => multiWrite({ calls: [
     { contractName: 'STARKNET_TOKEN', functionName: 'approve', args: [yourContractAddress, 1n * 10n**18n] },
     { contractName: 'YourContract', functionName: 'set_greeting', args: ['hello-premium', { type: 'CairoOption', variant: { some: { amount: 1n * 10n**18n } } }, 0n ] }
   ] });
   ```
   - Obtén `yourContractAddress` de salida de deploy.

6. Despliega en Sepolia:  
   ```
   yarn deploy --network sepolia
   yarn start
   ```
   - Conecta wallet real, prueba botones—txs aparecen en Starkscan.

**Resultado Esperado**: Página muestra saludo actual; botón "Set Greeting" actualiza a "hello-resolve"; "Premium Greeting" bundea approve + update (una firma). Enlaces al explorador verifican txs.

### ⚠️ Solución de Problemas Comunes
- **Error**: "Insufficient funds" en multi-write.  
  **Solución**: Aprueba ERC20 manualmente vía UI de depuración, o asegura fondos de faucet cubran gas.
- **Error**: Error de tipo en hook (ej. args inválidos).  
  **Solución**: Usa autocompletado en VS Code—hooks enforzan tipos ABI; chequea deploy para copia de ABI.
- **Error**: Despliegue Sepolia: "Invalid private key".  
  **Solución**: Usa cuenta deployer (no wallet principal); verifica en `.env` sin exponer públicamente.

### 💡 Mejores Prácticas
- Bundea txs para UX: Siempre usa multi-write para patrones approve+call para evitar doble-firma.
- Prueba en forks: Simula problemas de liquidez Mainnet sin fondos reales.
- Claves seguras: Usa `.env` con `.gitignore`; para prod, integra wallets hardware.

## ⛩️ Reflexión Final

### Síntesis de Aprendizaje
- ¿Cómo cambiaron la recarga automática y los hooks type-safe tu flujo de desarrollo comparado con setups manuales de Starknet?
- ¿Qué desafío (ej. bundling multi-write) te sorprendió más, y cómo impacta en la construcción de dApps amigables para el usuario?
- Reflexiona sobre un proyecto Starknet real (ej. idea de tu hackathon)—¿cómo aceleraría Scaffold-Stark?

### Pasos Siguientes Recomendados
- [ ] Forkea el repo de muestra y agrega una nueva característica de contrato (ej. emisión de eventos con hook `useEvents`).
- [ ] Explora extensiones: Ejecuta `npx create-stark@latest --extension indexer` para querying pre-integrado.
- [ ] Construye un proyecto personal: Integra Scaffold-Stark con un primitivo DeFi como UI de swap simple.

### Conexión con Otras Sesiones
Este playbook se basa en fundamentos de Cairo (taller previo) agregando velocidad full-stack dApp, preparando para temas avanzados como fintech en Starknet (siguiente sesión). Forma el núcleo de una progresión bootcamp Starknet: contratos → clientes → apps escalables.

## 📚 Recursos Extra

### Documentación Oficial
- Docs Completas de Scaffold-Stark: https://scaffoldstark.com/docs/quick-start
- Repo GitHub: https://github.com/Scaffold-Stark/scaffold-stark-2
- Guía Starknet.js: https://www.starknetjs.com/docs/guides/intro

### Tutoriales Avanzados
- Importando Contratos Existentes: https://scaffoldstark.com/docs/quick-start#importing-existing-smart-contracts
- Profundizando en Integración de Wallets: https://starknet-react.com/docs/getting-started
- Guía en Medium: https://medium.com/@horuslabsio/getting-started-build-and-deploy-a-dapp-using-starknet-scaffold-00c149213085

### Herramientas Complementarias
- ASDF para Gestión de Herramientas: https://asdf-vm.com/
- Setup de Dev Containers: https://code.visualstudio.com/docs/devcontainers/containers
- Faucets: https://starknet-faucet.vercel.app/

### Comunidades y Soporte
- Discord de Scaffold-Stark: Únete vía README de GitHub
- Foro Starknet: https://community.starknet.io/
- Telegram de Dojo Coding: Para Q&A específico de hackathon