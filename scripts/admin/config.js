const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function loadYaml(file) {
	return yaml.safeLoad(
		fs.readFileSync(path.join(__dirname, file))
	)
}

// pull CMS config from content folder
const gitConfig = loadYaml('../content/cms-config.yml')

// yaml config files for site settings
const settings = [
	'./settings/site.yml',
	'./settings/toc.yml'
].map(file => loadYaml(file))

const fields = {
	title: require('fields/title.js'),
	type: require('fields/type.js'),
	tags: require('fields/tags.js'),
	dimensions: require('fields/dimensions.js'),
}

// yaml config files for each content block
const blocks = [
	'blocks/heading.yml',
	'blocks/passage.yml',
	'blocks/figure.yml',
	'blocks/gallery.yml',
	'blocks/note.yml',
	'blocks/table.yml'
].map(block => loadYaml(block))

// config for 'body' with content blocks
const body = {
	label: 'Body blocks',
	name: 'body',
	widget: 'list',
	required: false,
	types: blocks
}

// create the Yaml admin config from this JS object
// -> allows us to break it up into reusable modules
fs.writeFileSync(
  path.join(__dirname, '../../build/admin/config.yml'),
  yaml.safeDump({
		backend: {
		  name: 'github',
		  repo: gitConfig.repo,
		  branch: gitConfig.branch
		},
		media_folder: 'source/assets/uploads',
		public_folder: '/uploads',
		site_url: gitConfig.publicUrl,
		publish_mode: 'editorial_workflow',
		collections: [

			// blog
			{
				label: 'Blog',
				name: 'blog',
				folder: 'content/blog',
				create: true,
				slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
				format: 'yml',
				editor: {
					preview: false
				},
				fields: [
					fields.title,
					{
						label: 'Subtitle',
						name: 'subtitle',
						widget: 'string',
						required: false
					},
					{
						label: 'Cover image',
						name: 'cover',
						widget: 'object',
						required: false,
						fields: [
							{
								label: 'Image',
								name: 'image',
								widget: 'image',
								required: false
							},
							{
								label: 'Border',
								name: 'border',
								widget: 'boolean',
								default: false
							},
							{
								label: 'Alt',
								name: 'alt',
								widget: 'string',
								required: false
							},
							{
								label: 'Resize',
								name: 'resize',
								widget: 'boolean',
								default: false
							},
							{
								label: 'Caption',
								name: 'caption',
								widget: 'string',
								required: false
							},
							{
								label: 'Credit',
								name: 'credit',
								widget: 'string',
								required: false
							}
						]
					},
					{
						label: 'Tags',
						name: 'tags',
						widget: 'list',
						required: false
					},
					body
				]
			},

			// pictures
			{
				label: 'Pictures',
				name: 'pictures',
				folder: 'content/pictures',
				create: true,
				slug: "{{year}}-{{slug}}",
				format: 'yml',
				editor: {
					preview: false
				},
				fields: [
					fields.title,
					{
						label: 'Date',
						name: 'date',
						widget: 'date',
						required: false
					},
					{
						label: 'Series',
						name: 'series',
						widget: 'select',
						options: [
							'Inventory',
							'Seasons'
						],
						required: false
					},
					...fields.dimensions(),
					{
						label: 'Category',
						name: 'category',
						widget: 'select',
						options: [
							'prints',
							'paintings'
						],
						default: 'prints'
					},
					fields.tags,
					{
						label: 'Cover image',
						name: 'cover',
						widget: 'image'
					},
					{
						label: 'Thumbnail image',
						name: 'thumb',
						widget: 'image'
					},
					{
						label: 'Intro',
						name: 'intro',
						widget: 'markdown',
						required: false
					},
					{
						label: 'Editions',
						name: 'editions',
						widget: 'list',
						required: false,
						fields: [
							{
								label: 'Size',
								name: 'name',
								widget: 'string'
							},
							{
								label: 'Type',
								name: 'type',
								widget: 'select',
								options: [
									'giclee',
									'screenprint'
								],
								default: 'giclee'
							},
							...fields.dimensions(['width', 'height', 'border']),
							{
								label: 'Price',
								name: 'price',
								widget: 'number',
								valueType: 'int'
							},
							{
								label: 'Limit', 
								name: 'limit', 
								hint: "Size of the edition; leave blank if open", 
								widget: 'number', 
								valueType: 'int', 
								required: false
							},
		          {
		          	label: 'Etsy listing', 
		          	name: 'url', 
		          	widget: 'string'
		          },
		          {
		          	label: 'Photo',
		            name: 'photo',
		            widget: 'image'
		          }
						]
					}
				]
			}
		]
	})
)
