import * as React from 'react'
import { useState } from 'react'

import { useModal } from '../../../shared/hooks/useModal'
import VacancyModal from '../components/VacancyModal/VacancyModal'
import { VacancyType } from '../types'

export function useVacancyModal(
  mode: 'update',
  vacancy: VacancyType,
): [React.JSX.Element, () => void, () => void]

export function useVacancyModal(mode: 'create'): [React.JSX.Element, () => void, () => void]

export function useVacancyModal(
  mode: 'update' | 'create',
  vacancy?: VacancyType,
): [React.JSX.Element, () => void, () => void] {
  const [isModalVisible, setIsModalVisible] = useState(false)
  // Handle variation props
  const optionalProps =
    mode === 'create'
      ? ({ mode: 'create' } as const)
      : ({
          mode: 'update',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          vacancy: vacancy!,
        } as const)

  const modal = useModal(
    <VacancyModal
      key={mode}
      hideModal={() => setIsModalVisible(false)}
      isVisible={isModalVisible}
      {...optionalProps}
    />,
  )
  const showModal = () => setIsModalVisible(true)
  const hideModal = () => setIsModalVisible(false)
  return [modal, showModal, hideModal]
}
