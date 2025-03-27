export const useHeadlessTabs = (defaultIndex: number) => {
  const renderId = ref(useId())

  const activeTab = ref(defaultIndex)
  const tabs = ref<string[]>([])
  const panels = ref<string[]>([])

  const registerTab = () => {
    const id = `${renderId.value}_${tabs.value.length}`
    const tabId = `tab-${id}`
    tabs.value = [...tabs.value, tabId]
    return tabId
  }

  const registerPanel = () => {
    const id = `${renderId.value}_${panels.value.length}`
    const panelId = `panel-${id}`
    panels.value = [...panels.value, panelId]
    return panelId
  }

  const init = () => {
    renderId.value = useId()
  }

  return { init, registerTab, registerPanel, tabs, panels, activeTab }
}
