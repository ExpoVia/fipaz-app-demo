/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser verification, not bundled into the app. */
const { chromium } = require("../../../../node_modules/.cache/map-verify/node_modules/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const artifacts = path.resolve("coverage/map");
fs.mkdirSync(artifacts, { recursive: true });
const url = process.env.MAP_TEST_URL || "http://localhost:3000/demo/map";

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    for (const viewport of [{ width: 390, height: 844 }, { width: 320, height: 640 }, { width: 1440, height: 1000 }]) {
      const context = await browser.newContext({ viewport, reducedMotion: "reduce", hasTouch: viewport.width < 500, recordVideo: viewport.width === 390 ? { dir: artifacts, size: viewport } : undefined });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(url);
      await page.getByRole("heading", { name: "FIPAZ 2026" }).waitFor();
      if (viewport.width > 1000) {
        // Exercise the standalone export in a wide host, beyond the demo's phone frame.
        await page.evaluate(() => {
          const host = document.querySelector('section[aria-label="Mapa FIPAZ 2026"]').parentElement;
          host.style.maxWidth = "1100px";
        });
        await page.waitForFunction(() => document.querySelector('svg[role="group"]').getAttribute("viewBox") === "0 80 1220 540");
      }
      await page.screenshot({ path: path.join(artifacts, `${viewport.width}-overview.png`) });
      const select = page.getByRole("combobox", { name: "Bloque o plaza" });
      const zoom = page.getByTestId("map-zoom");
      for (const [zone, level, name, count] of [
        ["red", "Planta baja", "Internacional I", 51], ["red", "Planta alta", "Internacional II", 61],
        ["yellow", "Planta baja", "Pabellon La Paz", 90], ["yellow", "Planta alta", "Pabellon Bolivia", 133],
        ["green", "Planta alta", "Pabellon Americano", 101], ["entrance", "Exterior", "Plaza Akapana", 7],
        ["food", "Exterior", "Patio de comidas", 29],
      ]) {
        await select.selectOption(zone);
        if (level === "Planta alta") await page.getByRole("button", { name: level, exact: true }).click();
        await page.getByRole("group", { name: `${name}, ${level}. Mapa demostrativo FIPAZ 2026`, exact: true }).waitFor();
        await page.waitForFunction(() => document.querySelector('[data-testid="map-zoom"]').textContent === "1.5x");
        assert.equal(await page.locator('g[id*="-stand-"][role="button"]').count(), count, `${name} count`);
        const pixels = await page.locator('svg[role="group"]').evaluate(async (svg) => {
          const img = new Image();
          img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`;
          await img.decode();
          const canvas = document.createElement("canvas"); canvas.width = 200; canvas.height = 150;
          const ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0, 200, 150);
          const data = ctx.getImageData(0, 0, 200, 150).data;
          let colored = 0;
          for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 0 && Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) > 15) colored++;
          return colored;
        });
        assert.ok(pixels > 100, `${name} renders nonblank colored geometry`);
        await page.getByRole("button", { name: "Centrar", exact: true }).click();
        await page.screenshot({ path: path.join(artifacts, `${viewport.width}-${zone}-${level.replaceAll(" ", "-")}.png`) });
        await page.getByRole("button", { name: "Acercar", exact: true }).click();
      }
      await select.selectOption("red");
      await page.getByRole("button", { name: "Buscar espacios" }).click();
      await page.getByRole("textbox", { name: "Numero o expositor" }).fill("Altiplano");
      await page.getByRole("button", { name: /12 Altiplano Tech/ }).click();
      await page.getByRole("complementary", { name: "Ficha del espacio" }).waitFor();
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute("aria-label")), "Cerrar ficha");
      await page.getByRole("button", { name: "Ver expositor" }).click();
      await page.getByRole("dialog", { name: "Expositor demostrativo" }).waitFor();
      await page.getByRole("button", { name: "Volver al mapa", exact: true }).click();
      const beforeClose = await zoom.textContent();
      await page.getByRole("button", { name: "Cerrar ficha" }).click();
      assert.equal(await zoom.textContent(), beforeClose, "Closing sheet preserves zoom");
      await page.getByRole("button", { name: "Buscar espacios" }).click();
      await page.getByRole("button", { name: /12 Altiplano Tech/ }).click();
      await page.getByRole("button", { name: "Como llegar" }).click();
      await page.getByRole("status").filter({ hasText: "Ruta aproximada" }).waitFor();
      assert.equal(await page.locator('g[aria-label="Ruta aproximada de demostracion"] polyline').count(), 2);
      await page.screenshot({ path: path.join(artifacts, `${viewport.width}-route.png`) });
      await page.getByRole("button", { name: "Cancelar ruta" }).click();
      assert.equal(await page.locator('g[aria-label="Ruta aproximada de demostracion"]').count(), 0);
      await page.keyboard.press("Escape");
      await page.getByRole("button", { name: "Filtros", exact: true }).click();
      for (const checkbox of await page.getByRole("group", { name: "Rubros", exact: true }).getByRole("checkbox").all()) await checkbox.uncheck();
      await page.getByRole("button", { name: "Cerrar panel" }).click();
      assert.equal(await page.locator('g[id*="-stand-"][role="button"]').count(), 0);
      await page.getByRole("button", { name: "Filtros", exact: true }).click();
      await page.getByRole("button", { name: "Restablecer" }).click();
      await page.getByRole("button", { name: "Cerrar panel" }).click();
      assert.equal(await page.locator('g[id*="-stand-"][role="button"]').count(), 51);
      await page.getByRole("button", { name: "¿Dónde estoy?" }).click();
      assert.equal(await zoom.textContent(), "2.4x");
      const transform = page.locator(".react-transform-component");
      const beforePan = await transform.getAttribute("style");
      const bounds = await page.locator(".react-transform-wrapper").boundingBox();
      await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + 60);
      await page.mouse.down(); await page.mouse.move(bounds.x + bounds.width / 2 - 40, bounds.y + 100, { steps: 8 }); await page.mouse.up();
      assert.notEqual(await transform.getAttribute("style"), beforePan, "Mouse drag pans the map");
      const beforeWheel = await zoom.textContent();
      await page.mouse.wheel(0, -250);
      await page.waitForFunction((old) => document.querySelector('[data-testid="map-zoom"]').textContent !== old, beforeWheel);
      if (viewport.width < 500) {
        await page.getByRole("button", { name: "Centrar", exact: true }).click();
        const session = await context.newCDPSession(page);
        const cx = bounds.x + bounds.width / 2, cy = bounds.y + bounds.height / 2;
        await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: cx - 25, y: cy, id: 1 }, { x: cx + 25, y: cy, id: 2 }] });
        for (const distance of [35, 45, 60, 75]) await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: cx - distance, y: cy, id: 1 }, { x: cx + distance, y: cy, id: 2 }] });
        await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        assert.ok(parseFloat(await zoom.textContent()) > 1.5, "Two-finger pinch zooms");
        await session.detach();
      }
      // The loaded SVG, filters and stand selection continue working without network.
      await context.setOffline(true);
      await select.selectOption("yellow");
      await page.getByRole("button", { name: "Planta alta", exact: true }).click();
      assert.equal(await page.locator('g[id*="-stand-"][role="button"]').count(), 133);
      await page.getByRole("button", { name: "Buscar espacios" }).click();
      await page.getByRole("textbox", { name: "Numero o expositor" }).fill("P14-A");
      await page.getByRole("button", { name: /P14-A Espacio P14-A/ }).click();
      assert.equal(await page.getByRole("button", { name: "Como llegar" }).isDisabled(), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, "No horizontal page overflow");
      assert.deepEqual(errors, []);
      await context.close();
      if (viewport.width === 390) await page.video().saveAs(path.join(artifacts, "map-mobile.webm"));
      console.log(`PASS ${viewport.width}x${viewport.height}: seven plans, pixels, selection, route, filters, pan, wheel, pinch, offline`);
    }
  } finally { await browser.close(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
