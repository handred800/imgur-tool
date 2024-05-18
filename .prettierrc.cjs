module.exports = {
    plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-packagejson',
        'prettier-plugin-organize-attributes'
    ],
    printWidth: 150, // 150 字元換行
    semi: true, // 每個語句的結尾不需要分號
    singleQuote: true, // 字串使用單引號
    attributeGroups: [
        '^v-if$',
        '^v-else$',
        '^v-else-if$',
        '^v-for$',
        '^(?::)?id$',
        '^(?::)?ref',
        '^(?::)?key',
        '^v-(?!loading$!if$!else$!else-if$!for$)',
        '^v-loading$',
        '^(?::)?model',
        '^(?::)?class$',
        '^(?::)?name$',
        '^(?::)?label$',
        '^(?::)?lang$',
        '^(?::)?src$',
        '^(?::)?type$',
        '^(?::)?href$',
        '^(?::)?value$',
        '^(?::)?title$',
        '^(?::)?alt$',
        '^(?::)?placeholder$',
        '$DEFAULT',
        '^(?::)?disabled$',
        '^(?::)?loading$',
        '^(?::)?src$',
        '^@'
    ],
    attributeSort: 'ASC',
    pluginSearchDirs: false,
    htmlWhitespaceSensitivity: 'ignore'
}
