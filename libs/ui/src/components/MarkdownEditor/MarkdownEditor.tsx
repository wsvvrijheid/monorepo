import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})

export const MarkdownEditor = () => {
  //   const [value, setValue] = React.useState('**Hello world!!!**')
  const handleOnChange = (it, event) => {
    console.log('handleEditorChange', { it })
  }
  return (
    <MdEditor
      style={{ height: '500px' }}
      renderHTML={text => <ReactMarkdown children={text} />}
      onChange={handleOnChange}
    />
  )
}
