import { expect, test } from '@playwright/test'

test.describe('reactle tests', () => {
  test('should be able to share and transfer stats', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/')
    await page.getByLabel('How to play').getByRole('button').click()

    await page.keyboard.type('devote')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.waitForTimeout(100)
    await page.keyboard.type('flame')
    await page.getByLabel('ENTER').click()

    await page.keyboard.type('grist')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.keyboard.type('quirk')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.keyboard.type('brawn')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.keyboard.type('hymns')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.locator('body').press('Enter')

    const elements = await page.$$('bg-green-500')
    console.log(elements.length)

    // TODO assert that there are some gray, yellow, and some green tiles
    // const greenTiles = page.locator('css=bg-green-500');
    // expect(greenTiles.length).toEqual(2)

    await page.getByRole('button', { name: 'Share' }).click()
    let shareClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareClipboardText).toContain('Reactle')
    expect(shareClipboardText).toContain('⬜')
    expect(shareClipboardText).toContain('🟨')
    expect(shareClipboardText).toContain('🟩')

    // TODO assert on warnings
    // await expect(page.getByText('Unable to share the results.')).toHaveText(
    // 'Unable to share the results. This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.'
    // )
    await page.getByRole('button', { name: 'Transfer' }).click()
    // expect(await page.getByTestId('emigration-code')).toHaveText('P/')
    await page.getByRole('button', { name: 'Copy' }).click()
    let transferClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(transferClipboardText).toContain('P/')

    await page
      .getByLabel('Transfer your statistics')
      .getByRole('button')
      .first()
      .click()
    await page.locator('svg').nth(1).click()
    await page.getByRole('button', { name: 'Share' }).click()
    let shareFromIconClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareFromIconClipboardText).toContain('Reactle')
  })
})
