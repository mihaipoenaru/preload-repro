import { sprintf } from 'sprintf-js';

const errorTags = {
	min_length: '',
	max_length: '',
	no_lowercase: '',
	no_uppercase: '',
	no_number: '',
	no_symbol: '',
	bad_email: '',
	passwords_no_match: '',
	bad_datetime: '',
	invoice_404: '',
	property_404: '',
	generic_missing_field: ''
};

export const eTags = {
	min_length: 'min_length',
	max_length: 'max_length',
	no_lowercase: 'no_lowercase',
	no_uppercase: 'no_uppercase',
	no_number: 'no_number',
	no_symbol: 'no_symbol',
	bad_email: 'bad_email',
	passwords_no_match: 'passwords_no_match',
	bad_datetime: 'bad_datetime',
	invoice_404: 'invoice_404',
	property_404: 'property_404',
	generic_missing_field: 'generic_missing_field'
};

export function err(zodError: ErrorTag | string) {
	const [tag, ...params] = zodError.split('|');
	const message = errorTags[tag as keyof typeof errorTags];

	if (!message) return '<err_tag_not_found>';
	return sprintf(message, ...params);
}

export type ErrorTag = keyof typeof errorTags;
