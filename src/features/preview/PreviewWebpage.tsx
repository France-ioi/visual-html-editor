import './PreviewWebpage.css'

type TPreviewWebpage = {
  code: string
}

function PreviewWebpage(props: TPreviewWebpage) {
  if (props.code) {
    console.log(props.code)
  }
  return (
    <div className={'webpage-preview'}>
      <iframe
        sandbox={'allow-same-origin'}
        id={'webpage-preview-iframe'}
        name={'webpage-preview-iframe'}
        title={'Webpage Preview'}
        srcDoc={props.code}
      />
    </div>
  )
}

export default PreviewWebpage