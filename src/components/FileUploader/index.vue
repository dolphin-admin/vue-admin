<script setup lang="ts">
import { UploadApi } from '@/api'
import UploadIcon from '~icons/ic/outline-cloud-upload'

export interface Props {
  accept?: string
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*'
})

const message = useMessage()

const customRequest = ({ file, onFinish, onError, onProgress }: UploadCustomRequestOptions) => {
  console.log('file', file)
  console.log('onFinish', onFinish)
  console.log('onError', onError)
  console.log('onProgress', onProgress)

  const formData = new FormData()
  // if (data) {
  //   Object.keys(data).forEach((key) => {
  //     formData.append(key, data[key as keyof UploadCustomRequestOptions['data']])
  //   })
  // }

  formData.append('file', file.file as File)

  UploadApi.uploadFile(formData, {
    onUploadProgress: (progressEvent) => {
      ;({ percent: Math.ceil((progressEvent.loaded / progressEvent.total) * 100) })
    }
  })
    .then((res) => {
      onFinish()
      console.log(res)
    })
    .catch((err) => {
      onError()
      console.log(err)
    })
}
</script>

<template>
  <NUpload
    :accept="props.accept"
    :custom-request="customRequest"
    :default-upload="false"
    directory-dnd
  >
    <NUploadDragger>
      <div class="mb-3">
        <NIcon
          size="48"
          :depth="3"
        >
          <UploadIcon />
        </NIcon>
      </div>
      <NText>点击或者拖动文件到该区域来上传</NText>
      <NP
        depth="3"
        class="mt-2"
      >
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </NP>
    </NUploadDragger>
  </NUpload>
</template>
