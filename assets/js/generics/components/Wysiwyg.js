import React, { useEffect, useRef, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import JoditEditor from 'jodit-react'

import './Wysiwyg.scss'
import { useMemo } from 'react'

const Wysiwyg = ({ onChange = () => {}, value, parentProperty }) => {
  const editor = useRef(null)

  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }

  useEffect(() => {
    const DOMeditor = document.getElementsByClassName('jodit-wysiwyg')[0]
    if (DOMeditor != null) {
      if (parentProperty != null) {
        DOMeditor.innerHTML = parentProperty.content
      } else {
        DOMeditor.innerHTML = ''
      }
    }
  }, [parentProperty])

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
