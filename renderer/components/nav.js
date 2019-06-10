import React from 'react'
import {withRouter} from 'next/router'
import {
  FiInstagram,
  FiUsers,
  FiSettings,
  FiMessageSquare,
  FiUserCheck,
} from 'react-icons/fi'
import {Box, List, Link, Text} from '../shared/components'
import Flex from '../shared/components/flex'
import userScheme from '../shared/types/user'
import theme from '../shared/theme'
import Loading from '../shared/components/loading'
import useValidation from '../shared/utils/useValidation'
import useIdentity from '../shared/utils/useIdentity'
import useEpoch from '../shared/utils/useEpoch'

const NavItem = withRouter(({href, router, icon, children}) => {
  const active = router.pathname.startsWith(href)
  const color = active ? theme.colors.white : theme.colors.white05
  return (
    <li>
      <Link href={href} color={color} width="100%" height="100%">
        <Flex align="center">
          {React.cloneElement(icon, {color, fontSize: theme.fontSizes.normal})}
          <Box w="8px" />
          {children}
        </Flex>
      </Link>
      <style jsx>{`
        li {
          ${active && `background: ${theme.colors.white01}`};
          border-radius: 4px;
          color: ${theme.colors.white05};
          cursor: pointer;
          padding: 0 1em;
          line-height: 2.2em;
          margin: 0 0 0.5em;
        }
        li:hover {
          border-radius: 4px;
          background: ${theme.colors.white01};
        }
      `}</style>
    </li>
  )
})

// eslint-disable-next-line react/prop-types
const Block = ({title, value, fallback = <Loading />}) => (
  <Box
    bg=""
    p={theme.spacings.normal}
    css={{
      borderBottom: `solid 1px ${theme.colors.gray3}`,
    }}
  >
    <Text
      color={theme.colors.muted}
      css={{display: 'block', marginBottom: theme.spacings.small}}
    >
      {title}
    </Text>
    <Text
      color={theme.colors.white}
      css={{
        display: 'block',
      }}
    >
      {value || fallback}
    </Text>
  </Box>
)

function Nav() {
  const {nickname, requiredFlips, flips} = useIdentity()
  const {currentPeriod, nextValidation} = useEpoch()
  const {running: validationRunning} = useValidation()

  return (
    <nav>
      <Box m="2em 0">
        <img src="../static/logo.svg" alt="idena logo" />
      </Box>
      <List>
        <NavItem href="/dashboard" active icon={<FiUserCheck />}>
          {'My Idena' || nickname}
        </NavItem>
        <NavItem href="/flips" icon={<FiInstagram />}>
          Flips
        </NavItem>
        <NavItem href="/contacts" icon={<FiUsers />}>
          Contacts
        </NavItem>
        <NavItem href="/chats" icon={<FiMessageSquare />}>
          Chats
        </NavItem>
        <NavItem href="/settings" icon={<FiSettings />}>
          Settings
        </NavItem>
        <Box
          bg={theme.colors.white01}
          m={`${theme.spacings.xlarge} 0`}
          css={{borderRadius: '10px'}}
        >
          <Block title="Current period" value={currentPeriod} />
          {!validationRunning && (
            <Block
              title="My current task"
              value={
                Number.isFinite(requiredFlips) &&
                `Create ${requiredFlips - (flips || []).length} flips`
              }
            />
          )}
          {!validationRunning && (
            <Block
              title="Next validation"
              value={
                nextValidation
                  ? new Date(nextValidation).toLocaleString()
                  : nextValidation
              }
            />
          )}
        </Box>
      </List>
      <style jsx>{`
        nav {
          background: ${theme.colors.primary2};
          color: white;
          padding: 2em;
          width: 250px;
          text-align: center;
          min-height: 100vh;
        }
        img {
          width: 96px;
          filter: invert(1);
        }
      `}</style>
    </nav>
  )
}

export default React.memo(Nav)
