import './PreviewWebpage.css'

type TPreviewWebpage = {
  code: string
}

function PreviewWebpage(props: TPreviewWebpage) {
  if (props.code) {
    console.log(props.code)
  }
  return (
    <div className={'webpage-preview-iframe'}>
      <iframe
        sandbox={'allow-same-origin'}
        id={'iframe-1'}
        name={'iframe-1'}
        title={'Webpage Preview'}
        srcDoc={props.code}
      />
    </div>
  )
}

export default PreviewWebpage