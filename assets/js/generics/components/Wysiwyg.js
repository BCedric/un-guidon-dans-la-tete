import { ContentState, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Wysiwyg = ({ onChange = () => {}, value }) => {
  const [editorState, setEditorState] = useState(null)

  useEffect(() => {
    if (value != null) {
      initEditor(value)
    } else {
      setEditorState(EditorState.createEmpty())
    }
  }, [])

  useEffect(() => {
    if (value === '') {
      initEditor(value)
    }
  }, [value])

  const initEditor = (val) => {
    const draftValue = htmlToDraft(val)
    if (draftValue) {
      const contentState = ContentState.createFromBlockArray(
        draftValue.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }

  const handleChange = (e) => {
    setEditorState(e)
    onChange(draftToHtml(convertToRaw(e.getCurrentContent())))
  }

  return (
    <>
      <Editor editorState={editorState} onEditorStateChange={handleChange} />
    </>
  )
}

export default Wysiwyg
