import { Fragment } from 'react'

function SanitizedText({ text }) {
    const content = text.split('\n')

    const len = content.length
    if (len >= 2 && content[len - 1] === content[len - 2]) {
        content.pop()
    }

    const reactContent = content.map((line, index) => (
        <Fragment key={index}>
            {line}
            {content.length - 1 !== index ? <br /> : null}
        </Fragment>
    ))

    return <div>{reactContent}</div>
}

export default SanitizedText
