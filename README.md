# iRacing Touch Keyboard

**v0.1** — Teclado táctil en pantalla personalizado para iRacing, pensado para una pantalla secundaria de 7" conectada al PC de sim racing.

## El problema

Mi setup de sim racing (MOZA R12, MOZA KS, MOZA CS, MOZA SR-P Load Cell) ya tiene cubiertos los controles de coche en los volantes: TC, ABS, Brake Bias, etc.

Lo que me falta son botones cómodos para los **comandos de comunicación de iRacing**: Sorry, Thank you, Pitting in, Pass left, Pass right, etc. Durante una carrera estos comandos son útiles pero no tengo suficientes botones libres en los volantes sin sacrificar controles de coche.

## La solución

Una pantalla táctil de 7" (JRP7813S, 1024×600, HDMI + USB) usada como segundo monitor, con esta app corriendo encima. Botones grandes, un toque envía la tecla, iRacing la recibe sin perder el foco.

No es un Stream Deck genérico ni un dashboard de telemetría. Es un **teclado en pantalla especializado** — como el `osk.exe` de Windows pero diseñado para sim racing.

## Hardware

- **Pantalla**: JRP7813S 7" capacitiva, 1024×600, HDMI
- **PC**: Windows 11, Ryzen 7 5700X3D, RTX 3070 Ti
- **Volantes/pedales**: MOZA R12, MOZA KS, MOZA CS, MOZA SR-P Load Cell
- **Sim**: iRacing

## Stack

- **Tauri v2** — ventana nativa Windows vía WebView2, bajo consumo de recursos
- **React + TypeScript** — UI
- **Rust** — backend mínimo con `enigo` (inyección de teclas) y `windows` crate (`WS_EX_NOACTIVATE` para evitar robo de foco a iRacing)

## Arquitectura

Los botones están definidos en `src/config.ts` como objetos `{ id, label, key, span?, color? }`. La UI itera sobre ese array. Cambiar el layout, las teclas o los colores = editar una línea de config, sin tocar React.

El border de cada botón se deriva automáticamente del color de fondo (`color-mix` en CSS). El color del texto se autocalcula por luminancia para contrastar.

## Desarrollo

```bash
npm install
npm run tauri dev
```

Target de build final: Windows. El código compila en Mac/Linux para iterar la UI, pero la configuración de ventana no-roba-foco (`WS_EX_NOACTIVATE`, always on top, sin bordes) solo se aplica en Windows, detrás de `#[cfg(target_os = "windows")]`.

## Estado

- [x] MVP: touch → tecla → aplicación con foco
- [x] Layout configurable, 10 botones de comunicación
- [x] Colores + contraste automático
- [x] Config de ventana Windows (anti focus-steal)
- [ ] Testear end-to-end contra iRacing
- [ ] Mapear teclas finales según bindings de chat macros en iRacing
