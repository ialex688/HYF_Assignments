import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { HomePage } from '../Week8/TestPage';

test.describe('Aegean homepage accessibility scan (WCAG 2.1 A & AA)', () => {
  test('should not have accessibility violations', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    console.log(`Total violations: ${results.violations.length}`);

    for (const violation of results.violations) {
      console.log(`Rule: ${violation.id}`);
      console.log(`Help: ${violation.help}`);
      console.log(`Impact: ${violation.impact}`);
      console.log(`Affected nodes: ${violation.nodes.length}`);
      console.log('---');
    }

    await testInfo.attach('axe-report.json', {
      body: JSON.stringify(results, null, 2),
      contentType: 'application/json',
    });

    expect(results.violations).toEqual([]);
  });
});