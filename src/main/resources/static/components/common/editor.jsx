import { EditorState } from "draft-js"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { stateFromHTML } from 'draft-js-import-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { loading: () => null, ssr: false }
)

function RichTextEditor({ initialData, editorState, setEditorState }) {
    const onEditorStateChange = editorState => {
        setEditorState(editorState)
    }

    useEffect(() => {
        if (initialData !== null && initialData !== undefined) {
            setEditorState(
                EditorState.createWithContent(
                    stateFromHTML(initialData)
                )
            )
        } else {
            setEditorState(
                EditorState.createEmpty()
            )
        }
    }, [initialData])

    return (
        <>
            <Editor
                wrapperClassName='wrapper-class'
                editorClassName='editor'
                toolbarClassName='toolbar-class'
                toolbar={{
                    options: ['fontFamily', 'fontSize', 'inline', 'textAlign', 'image', 'list', 'link', 'history'],
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
                    // ,
                    // image: {
                    //     uploadCallback: (file) => {
                    //         console.log(file)
                    //     },
                    //     urlEnabled: false,
                    //     uploadEnabled: true,
                    //     previewImage: true
                    // },
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