import cn from 'classnames';
import Button from '@/components/ui/button';
import { WalletContext } from '@/lib/hooks/use-connect';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';
import { useModal } from '@/components/modal-views/context';
import { useContext } from 'react';
import { vinceTestnet } from '@/hooks/vinceChain';
import {
  useSuggestChainAndConnect,
  mainnetChains,
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useBalanceStaked,
} from '@ayris-dev/cosmoshooks';
import Image from 'next/image';
import Avatar from '@/assets/images/avatar.png';

export default function WalletConnect({
  btnClassName,
  anchorClassName,
}: {
  btnClassName?: string;
  anchorClassName?: string;
}) {
  const { suggestAndConnect } = useSuggestChainAndConnect();
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  function handleSuggestAndConnect() {
    suggestAndConnect({
      chainInfo: vinceTestnet,
    });
  }
  const { data: atomBalance, isLoading, refetch } = useBalance('avce');
  const { openModal } = useModal();

 

  return (
    <>
      {isConnected ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <div className="group flex h-[50px] cursor-pointer flex-row items-center rounded-xl border p-2 text-[12px]">
              <div>
                <Image src={Avatar} width={40} height={40} alt="test" />
              </div>
              <div className="ml-4 flex flex-col items-end justify-end">
                <div>
                  {account.bech32Address.slice(0, 6)}
                  {'...'}
                  {account.bech32Address.slice(
                    account.bech32Address.length - 6
                  )}
                </div>
                <div>
                  {isLoading ? (
                    'Fetching balances...'
                  ) : (
                    <span>
                      {atomBalance.amount / 1000000000000000000}
                      {atomBalance.denom.slice(1, 6)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <Button
          onClick={() => handleSuggestAndConnect()}
          className={cn('shadow-main hover:shadow-large', btnClassName)}
        >
          CONNECT
        </Button>
      )}
    </>
  );
}
