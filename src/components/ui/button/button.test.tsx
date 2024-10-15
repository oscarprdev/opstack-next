import * as stories from './button.stories';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

const { Default } = composeStories(stories);

describe('Button', () => {
	describe('Default', () => {
		it('Should render successfulyy', () => {
			render(<Default>Default button</Default>);
			const button = screen.getByText('Default button');
			expect(button.className).toContain('bg-primary');
		});
	});
});
