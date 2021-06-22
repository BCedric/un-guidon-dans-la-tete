import { ContentState, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import JoditEditor from 'jodit-react'

import './Wysiwyg.scss'
import { useMemo } from 'react'

const Wysiwyg = ({ onChange = () => {}, value }) => {
  const editor = useRef(null)

  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }

  return useMemo(
    () => (
      <>
        <JoditEditor
          editorRef={editor}
          value={value}
          config={config}
          onChange={onChange}
        />
      </>
    ),
    []
  )
}

export default React.memo(Wysiwyg)
