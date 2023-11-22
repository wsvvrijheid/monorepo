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

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Asset, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, ModelEditForm } from '@wsvvrijheid/ui'

const AssetPage = () => {
  // const { t } = useTranslation()

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
