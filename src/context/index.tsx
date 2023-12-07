import Accounts from "./Account";
import Products from "./Product";
import Spares from "./Spare";
import Tasks from "./Tasks";
import Order from "./Order";
import Storages from "./Storage";

const Context = ({ children }: any) => {
  return (
    <Tasks>
      <Spares>
        <Order>
          <Storages>
            <Products>
              <Accounts>{children}</Accounts>
            </Products>
          </Storages>
        </Order>
      </Spares>
    </Tasks>
  );
};

export default Context;
