import { Page } from "@playwright/test";

export class BasePage {
    constructor(private readonly page: Page) {}
}