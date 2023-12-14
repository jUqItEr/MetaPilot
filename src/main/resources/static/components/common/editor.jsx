import { EditorState } from "draft-js"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { stateFromHTML } from 'draft-js-import-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { loading: () => null, ssr: false }
)

function RichTextEditor({ initialData }) {
    const [editorState, setEditorState] = useState()

    const onEditorStateChange = editorState => {
        setEditorState(editorState)
    }

    useEffect(() => {
        setEditorState(
            EditorState.createWithContent(
                stateFromHTML(initialData)
            )
        )
    }, [initialData])

    return (
        <>
            <Editor
                wrapperClassName='wrapper-class'
                editorClassName='editor'
                toolbarClassName='toolbar-class'
                toolbar={{
                    options: ['fontFamily', 'fontSize', 'inline', 'textAlign', 'history', 'image', 'list', 'link'],
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
                editorState={editorState}
                onEditorStateChange={onEditorStateChange} />
        </>
    )
}

export default RichTextEditor