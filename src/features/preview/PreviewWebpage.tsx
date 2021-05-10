import './PreviewWebpage.css'

function PreviewWebpage() {
  return (
    <div className={'webpage-preview-iframe'}>
      <iframe sandbox={''} id={'iframe-1'}></iframe>
    </div>
  )
}

export default PreviewWebpage