import { EditorState } from "draft-js"
import { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const DraftEditor = () => {
    const editorStyle = {
        cursor: 'pointer',
        width: '100%',
        minHeight: '20rem',
        border: '2px solid rgba(209, 213, 219, var(--tw-border-opacity))',
    }

    const [state, setState] = useState(EditorState.createEmpty())

    const onStateChange = state => {
        setState(state)
    }

    return (
        <div style={ editorStyle }>
            <Editor
                wrapperClassName='wrapper-class'
                editorClassName='editor'
                toolbarClassName='toolbar-class'
                toolbar={{
                    list: {
                        inDropdown: true
                    },
                    textAlign: {
                        inDropdown: true
                    },
                    link: {
                        inDropdown: true
                    },
                    history: {
                        inDropdown: false
                    }
                }}
                placeholder='내용을 작성해주세요.'
                localization={{
                    locale: 'ko',
                }}
                editorState={state}
                onEditorStateChange={onStateChange}
            />
        </div>
    )
}

export default DraftEditor