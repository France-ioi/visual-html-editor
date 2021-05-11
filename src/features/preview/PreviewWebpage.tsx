import './PreviewWebpage.css'

type TPreviewWebpage = {
  code: string
}

function PreviewWebpage(props: TPreviewWebpage) {
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