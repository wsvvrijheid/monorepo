import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stack,
  Text,
} from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { TbActivity } from 'react-icons/tb'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Asset, StrapiLocale } from '@wsvvrijheid/types'
import { AssetsTracking } from '@wsvvrijheid/types/src/assets-tracking'
import { AdminLayout, ModelCreateModal, ModelEditForm, useFields, useSchema } from '@wsvvrijheid/ui'

const AssetPage = () => {
  // const { t } = useTranslation()
const schemas = useSchema()
 const fields = useFields()
  const { query } = useRouter()

  const id = Number(query.id as string)

  const { data, isLoading, refetch } = useStrapiRequest<Asset>({
    endpoint: 'assets',
    id,
  })

  const asset = data?.data

  return (
    <AdminLayout seo={{ title: 'Asset' }} isLoading={isLoading} hasBackButton>
      <Stack spacing={8} p={6}>
        <Accordion
          size={'lg'}
          allowToggle
          allowMultiple={false}
          defaultIndex={0}
          borderColor="transparent"
          defaultValue={1}
        >
          <AccordionItem _notLast={{ mb: 2 }}>
            <AccordionButton
              justifyContent="space-between"
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>{asset?.name}</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel mt={4} bg={'white'} rounded={'md'}>
              {asset && (
                <ModelEditForm<Asset>
                  endpoint="assets"
                  model={asset}
                  onSuccess={refetch}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
          {/*
TODO
TRACKING MUST BE HERE
*/}
        </Accordion>
        {
          /*
          {t('create-asset-trackings')}
          */
        }
         <ModelCreateModal<AssetsTracking>
                  title='assets-trackings'
                  endpoint="assets-trackings"
                  schema={schemas['assets-trackings']!}
                  fields={fields['assets-trackings']!}
                  buttonProps={{
                    variant: 'outline',
                    leftIcon: <TbActivity />,
                  }}
                >
                  {/* {t('create-asset-tracking')} */}
                  create assets trackings
                </ModelCreateModal>
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default AssetPage
